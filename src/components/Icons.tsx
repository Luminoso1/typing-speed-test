interface Props extends React.SVGProps<SVGSVGElement> {}

export const Check = (props: Props) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-32 w-32 rounded-full bg-green-500/10" />
      <div className="absolute h-24 w-24 animate-ping rounded-full bg-green-500/20 [animation-duration:3s]" />
      <div className="absolute h-24 w-24 animate-pulse rounded-full bg-green-500/30" />

      <svg
        viewBox="0 0 48 48"
        className="relative z-10 h-16 w-16 drop-shadow-lg"
        {...props}
      >
        <circle cx="24" cy="24" r="24" fill="#4DD67B" />

        <path
          d="M14 24.5L21 31.5L34 18.5"
          stroke="#000000"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-check"
        />
      </svg>

      <style>{`
        @keyframes drawCheck {
          from {
            stroke-dashoffset: 40;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-check {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawCheck 0.6s ease-out forwards;
          animation-delay: 0.3s; 
        }
      `}</style>
    </div>
  )
}

export const Party = (props: Props) => {
  return (
    <div className="relative flex items-center justify-center p-8">
      <div className="absolute h-32 w-32 rounded-full bg-[#F4DC73]/10" />

      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
        {...props}
      >
        {/* 1. Cono: Se dibuja primero */}
        <path
          d="M23.6634 46.4027C26.0141 48.5976 32.9495 44.9859 39.1558 38.3387C45.3593 31.6912 48.486 24.525 46.1353 22.3299C43.7847 20.1349 36.8465 23.7466 30.6428 30.3939C24.4366 37.0413 21.3127 44.2077 23.6634 46.4027Z"
          stroke="#F4DC73"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 120, strokeDashoffset: 120 }}
          className="animate-stroke-inner"
        />

        <g
          style={{ strokeDasharray: 80, strokeDashoffset: 80 }}
          className="animate-stroke-inner"
        >
          <path
            d="M46.5407 22.8542L55.9098 52.2771C56.3458 53.652 55.0951 54.9701 53.6964 54.6043L24.541 46.932"
            stroke="#F4DC73"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M40.9688 51.2509C42.8992 49.8602 44.9074 48.0594 46.8378 46.0021C48.8693 43.8122 50.5687 41.573 51.8557 39.4896"
            stroke="#F4DC73"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M17.1927 37.5493C12.2551 37.168 8 41.7656"
            stroke="#F4DC73"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M33.9511 33.8152C25.2955 24.8846 12.0371 28.6597"
            stroke="#F4DC73"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M36.9355 9.33333C31.9229 16.196 37.4752 24.4469"
            stroke="#F4DC73"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* 3. Puntos decorativos: Aparecen al final */}
        <g className="animate-pop">
          <circle cx="8.5" cy="18.3" r="2" fill="#F4DC73" />
          <circle cx="15.8" cy="45.6" r="2" fill="#F4DC73" />
          <circle cx="22.3" cy="15.9" r="3" fill="#F4DC73" />
          <path
            d="M17.1927 37.5493C17.1927 37.5493 12.2551 37.168 8 41.7656"
            stroke="#F4DC73"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.5262 15.9206C25.5262 17.6668 24.1095 19.0835 22.3634 19.0835C20.6172 19.0835 19.2031 17.6668 19.2031 15.9206C19.2031 14.1745 20.6172 12.7604 22.3634 12.7604C24.1095 12.7604 25.5262 14.1745 25.5262 15.9206Z"
            stroke="#F4DC73"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M33.9511 33.8152C33.9511 33.8152 25.2955 24.8846 12.0371 28.6597"
            stroke="#F4DC73"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M36.9355 9.33333C36.9355 9.33333 31.9229 16.196 37.4752 24.4469"
            stroke="#F4DC73"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>

      <style>{`
        @keyframes drawCone {
          to { stroke-dashoffset: 0; }
        }
        @keyframes explosion {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes party-glow {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 1; }
        }

        .animate-stroke-inner {
          animation: drawCone 0.8s ease-out forwards;
        }
        .animate-explosion {
          transform-origin: center;
          animation: explosion 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.49) forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        .animate-pop {
          transform-origin: center;
          animation: pop 0.3s ease-out forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }
        .animate-party-glow {
          animation: party-glow 0.8s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
