import { useCallback, useEffect, useRef, useState } from "react";
import { X, RotateCcw, Check } from "lucide-react";

const CameraComponent = ({ onClose, onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [stream, setStream] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [facingMode, setFacingMode] = useState("user");

    const startCamera = useCallback(async () => {
        try {
            // Purana camera stream stop
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }

            const mediaStream =
                await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: facingMode,
                    },
                    audio: false,
                });

            setStream(mediaStream);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.log("Camera Error:", error);
        }
    }, [facingMode, stream]);

    // Stop Camera
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
    };

    useEffect(() => {
        startCamera();

        return () => {
            stopCamera()
        };
    }, [startCamera]);

    // Capture Photo
    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        // Front camera ke liye mirror effect
        if (facingMode === "user") {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const image = canvas.toDataURL("image/jpeg", 0.9);

        setPhoto(image);
        stopCamera();
    };

    // Retake
    const retakePhoto = () => {
        setPhoto(null);
        startCamera();
    };

    // Use Photo
    const usePhoto = () => {
        if (onCapture) {
            onCapture(photo);
        }

        onClose();
    };

    // Switch Camera
    const switchCamera = () => {
        setFacingMode((prev) =>
            prev === "user" ? "environment" : "user"
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">

            {/* Header */}
            <div className="h-16 px-5 flex items-center justify-between text-white bg-black/70">
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10"
                >
                    <X size={26} />
                </button>

                <h2 className="text-lg font-semibold">
                    Camera
                </h2>

                <button
                    onClick={switchCamera}
                    className="p-2 rounded-full hover:bg-white/10"
                >
                    <RotateCcw size={25} />
                </button>
            </div>

            {/* Camera / Preview */}
            <div className="flex-1 flex items-center justify-center bg-black overflow-hidden">

                {!photo ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""
                            }`}
                    />
                ) : (
                    <img
                        src={photo}
                        alt="Captured"
                        className="w-full h-full object-contain"
                    />
                )}

                <canvas
                    ref={canvasRef}
                    className="hidden"
                />
            </div>

            {/* Bottom Controls */}
            <div className="h-28 bg-black flex items-center justify-center">

                {!photo ? (
                    <button
                        onClick={capturePhoto}
                        className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
                    >
                        <span className="w-16 h-16 bg-white rounded-full hover:scale-95 transition" />
                    </button>
                ) : (
                    <div className="flex items-center gap-10">

                        {/* Retake */}
                        <button
                            onClick={retakePhoto}
                            className="flex flex-col items-center gap-1 text-white"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                <RotateCcw size={22} />
                            </div>
                            <span className="text-sm">
                                Retake
                            </span>
                        </button>

                        {/* Use Photo */}
                        <button
                            onClick={usePhoto}
                            className="flex flex-col items-center gap-1 text-white"
                        >
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <Check size={25} />
                            </div>
                            <span className="text-sm">
                                Use Photo
                            </span>
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CameraComponent;