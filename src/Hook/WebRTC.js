import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { socket } from "../socket/socket";

const ICE_SERVERS = {
    iceServers: [
        {
            urls:
                "stun:stun.l.google.com:19302",
        },
        {
            urls:
                "stun:stun1.l.google.com:19302",
        },
    ],
};

export const useWebRTC = ({
    callId,
    localUserId,
    remoteUserId,
    active,
    type,
}) => {
    const peerRef =
        useRef(null);

    const localStreamRef =
        useRef(null);

    const remoteStreamRef =
        useRef(
            new MediaStream()
        );

    const pendingCandidates =
        useRef([]);

    const [localStream, setLocalStream] =
        useState(null);

    const [remoteStream, setRemoteStream] =
        useState(
            remoteStreamRef.current
        );

    // ========================================
    // CREATE PEER
    // ========================================

    const createPeer = useCallback(
        () => {
            if (peerRef.current) {
                return peerRef.current;
            }

            const peer =
                new RTCPeerConnection(
                    ICE_SERVERS
                );

            peer.onicecandidate = (
                event
            ) => {
                if (
                    event.candidate &&
                    remoteUserId
                ) {
                    socket.emit(
                        "webrtc:ice-candidate",
                        {
                            targetUserId:
                                remoteUserId,
                            candidate:
                                event.candidate,
                            callId,
                        }
                    );
                }
            };

            peer.ontrack = (event) => {
                event.streams[0]
                    ?.getTracks()
                    .forEach((track) => {
                        remoteStreamRef.current.addTrack(
                            track
                        );
                    });

                setRemoteStream(
                    remoteStreamRef.current
                );
            };

            peer.onconnectionstatechange =
                () => {
                    console.log(
                        "WebRTC state:",
                        peer.connectionState
                    );
                };

            peerRef.current = peer;

            return peer;
        },
        [callId, remoteUserId]
    );

    // ========================================
    // GET MEDIA
    // ========================================

    const getMedia = useCallback(
        async () => {
            const constraints = {
                audio: true,
                video:
                    type === "video",
            };

            const stream =
                await navigator.mediaDevices.getUserMedia(
                    constraints
                );

            localStreamRef.current =
                stream;

            setLocalStream(stream);

            const peer =
                createPeer();

            stream
                .getTracks()
                .forEach((track) => {
                    peer.addTrack(
                        track,
                        stream
                    );
                });

            return stream;
        },
        [type, createPeer]
    );

    // ========================================
    // CREATE OFFER
    // ========================================

    const createOffer = useCallback(
        async () => {
            const peer =
                createPeer();

            const offer =
                await peer.createOffer();

            await peer.setLocalDescription(
                offer
            );

            socket.emit(
                "webrtc:offer",
                {
                    targetUserId:
                        remoteUserId,
                    offer,
                    callId,
                }
            );
        },
        [
            createPeer,
            remoteUserId,
            callId,
        ]
    );

    // ========================================
    // HANDLE OFFER
    // ========================================

    const handleOffer =
        useCallback(
            async ({
                offer,
                fromUserId,
            }) => {
                const peer =
                    createPeer();

                if (
                    !localStreamRef.current
                ) {
                    await getMedia();
                }

                await peer.setRemoteDescription(
                    new RTCSessionDescription(
                        offer
                    )
                );

                for (const candidate of pendingCandidates.current) {
                    await peer.addIceCandidate(
                        new RTCIceCandidate(
                            candidate
                        )
                    );
                }

                pendingCandidates.current = [];

                const answer =
                    await peer.createAnswer();

                await peer.setLocalDescription(
                    answer
                );

                socket.emit(
                    "webrtc:answer",
                    {
                        targetUserId:
                            fromUserId,
                        answer,
                        callId,
                    }
                );
            },
            [createPeer, getMedia, callId]
        );

    // ========================================
    // HANDLE ANSWER
    // ========================================

    const handleAnswer =
        useCallback(
            async ({ answer }) => {
                const peer =
                    peerRef.current;

                if (!peer) return;

                await peer.setRemoteDescription(
                    new RTCSessionDescription(
                        answer
                    )
                );

                for (const candidate of pendingCandidates.current) {
                    await peer.addIceCandidate(
                        new RTCIceCandidate(
                            candidate
                        )
                    );
                }

                pendingCandidates.current = [];
            },
            []
        );

    // ========================================
    // ICE
    // ========================================

    const handleIceCandidate =
        useCallback(
            async ({
                candidate,
            }) => {
                const peer =
                    peerRef.current;

                if (
                    !peer ||
                    !candidate
                ) {
                    return;
                }

                if (
                    peer.remoteDescription
                ) {
                    try {
                        await peer.addIceCandidate(
                            new RTCIceCandidate(
                                candidate
                            )
                        );
                    } catch (error) {
                        console.error(
                            error
                        );
                    }
                } else {
                    pendingCandidates.current.push(
                        candidate
                    );
                }
            },
            []
        );

    // ========================================
    // SOCKET EVENTS
    // ========================================

    useEffect(() => {
        if (!active) return;

        const offerHandler = (data) => {
            if (
                data.callId === callId
            ) {
                handleOffer(data);
            }
        };

        const answerHandler = (
            data
        ) => {
            if (
                data.callId === callId
            ) {
                handleAnswer(data);
            }
        };

        const iceHandler = (data) => {
            if (
                data.callId === callId
            ) {
                handleIceCandidate(
                    data
                );
            }
        };

        socket.on(
            "webrtc:offer",
            offerHandler
        );

        socket.on(
            "webrtc:answer",
            answerHandler
        );

        socket.on(
            "webrtc:ice-candidate",
            iceHandler
        );

        return () => {
            socket.off(
                "webrtc:offer",
                offerHandler
            );

            socket.off(
                "webrtc:answer",
                answerHandler
            );

            socket.off(
                "webrtc:ice-candidate",
                iceHandler
            );
        };
    }, [
        active,
        callId,
        handleOffer,
        handleAnswer,
        handleIceCandidate,
    ]);

    // ========================================
    // CLEANUP
    // ========================================

    const cleanup = useCallback(
        () => {
            localStreamRef.current
                ?.getTracks()
                .forEach((track) =>
                    track.stop()
                );

            peerRef.current
                ?.close();

            peerRef.current = null;

            localStreamRef.current =
                null;

            remoteStreamRef.current =
                new MediaStream();

            pendingCandidates.current =
                [];

            setLocalStream(null);

            setRemoteStream(
                remoteStreamRef.current
            );
        },
        []
    );

    return {
        localStream,
        remoteStream,
        getMedia,
        createOffer,
        createPeer,
        cleanup,
    };
};