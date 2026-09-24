const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f0f2f5] overflow-hidden">
      {/* Background circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#00a884]/10 rounded-full blur-3xl animate-pulse" />

      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#25d366]/10 rounded-full blur-3xl animate-pulse" />

      {/* Main */}
      <div className="relative flex flex-col items-center">
        {/* Logo Ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div
            className="
              absolute inset-0
              rounded-full
              border-[3px]
              border-transparent
              border-t-[#00a884]
              border-r-[#00a884]
              animate-spin
            "
          />

          {/* Inner rotating ring */}
          <div
            className="
              absolute inset-3
              rounded-full
              border-2
              border-transparent
              border-b-[#25d366]
              animate-[spin_2s_linear_infinite_reverse]
            "
          />

          {/* Logo */}
          <div
            className="
              w-16 h-16
              rounded-full
              bg-[#00a884]
              flex items-center justify-center
              shadow-xl
              shadow-[#00a884]/30
              animate-[pulse_2s_ease-in-out_infinite]
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="w-9 h-9 text-white fill-current"
            >
              <path d="M12 2C6.48 2 2 6.17 2 11.33c0 2.02.72 3.9 1.92 5.4L2.5 21.5l4.95-1.65A10.7 10.7 0 0 0 12 20.67c5.52 0 10-4.17 10-9.34C22 6.17 17.52 2 12 2Zm5.2 13.32c-.22.6-1.28 1.14-1.76 1.2-.45.06-1.02.08-1.65-.1-.38-.11-.87-.28-1.5-.55-2.64-1.14-4.36-3.8-4.49-3.98-.13-.18-1.08-1.43-1.08-2.73 0-1.3.68-1.94.92-2.2.24-.27.52-.33.7-.33.17 0 .35 0 .5.01.16.01.38-.06.6.46.22.53.75 1.83.81 1.96.07.13.11.28.02.46-.08.18-.12.28-.24.43-.12.15-.25.33-.36.44-.12.12-.24.25-.1.49.14.24.62 1.02 1.34 1.65.92.82 1.7 1.07 1.95 1.2.25.12.4.11.55-.07.15-.18.63-.73.8-.98.17-.25.34-.21.57-.13.24.08 1.5.71 1.75.84.25.13.42.19.48.3.06.11.06.64-.16 1.24Z" />
            </svg>
          </div>
        </div>

        {/* Brand */}
        <h1
          className="
            mt-7
            text-2xl
            font-semibold
            text-gray-700
            tracking-wide
          "
        >
          Wordwav
        </h1>

        {/* Loading text */}
        <div className="mt-3 flex items-center gap-1 text-gray-400 text-sm">
          <span>Connecting</span>

          <span className="flex gap-1 ml-1">
            <span className="w-1.5 h-1.5 bg-[#00a884] rounded-full animate-bounce" />
            <span
              className="
                w-1.5 h-1.5
                bg-[#00a884]
                rounded-full
                animate-bounce
                [animation-delay:150ms]
              "
            />
            <span
              className="
                w-1.5 h-1.5
                bg-[#00a884]
                rounded-full
                animate-bounce
                [animation-delay:300ms]
              "
            />
          </span>
        </div>

        {/* Progress */}
        <div className="mt-7 w-44 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-[#00a884]
              rounded-full
              animate-[loading_2s_ease-in-out_infinite]
            "
          />
        </div>

        {/* Bottom */}
        <p className="mt-6 text-xs text-gray-400">End-to-end encrypted</p>
      </div>
    </div>
  );
};

export default LoadingPage;
