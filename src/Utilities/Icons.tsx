import React from "react";

interface IconsProps {
  variant: string;
}

const Icons: React.FC<IconsProps> = ({ variant }) => {
  switch (variant) {
    case "backArrow":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_715_4913)">
            <path
              d="M14.6661 6.66663H4.54191L8.94374 2.28357C9.19491 2.03271 9.33602 1.69246 9.33602 1.33769C9.33602 0.98291 9.19491 0.642664 8.94374 0.391799C8.69256 0.140934 8.35189 0 7.99668 0C7.64146 0 7.30079 0.140934 7.04961 0.391799L0.380176 7.05298C0.258738 7.17968 0.163545 7.32908 0.10006 7.49261C-0.0333532 7.81696 -0.0333532 8.18077 0.10006 8.50511C0.163545 8.66865 0.258738 8.81805 0.380176 8.94475L7.04961 15.6059C7.17362 15.7308 7.32115 15.8299 7.48369 15.8975C7.64624 15.9652 7.82059 16 7.99668 16C8.17276 16 8.34711 15.9652 8.50966 15.8975C8.6722 15.8299 8.81973 15.7308 8.94374 15.6059C9.06876 15.4821 9.16799 15.3347 9.23571 15.1724C9.30343 15.01 9.3383 14.8359 9.3383 14.66C9.3383 14.4842 9.30343 14.31 9.23571 14.1477C9.16799 13.9853 9.06876 13.838 8.94374 13.7142L4.54191 9.3311H14.6661C15.0199 9.3311 15.3592 9.19074 15.6093 8.9409C15.8595 8.69105 16 8.35219 16 7.99886C16 7.64553 15.8595 7.30667 15.6093 7.05683C15.3592 6.80699 15.0199 6.66663 14.6661 6.66663Z"
              fill="#202124"
            />
          </g>
          <defs>
            <clipPath id="clip0_715_4913">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "Email":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.67916 11.231C1.73363 13.7856 1.76087 15.0629 2.70348 16.0091C3.64608 16.9553 4.95796 16.9882 7.58171 17.0541C9.19877 17.0948 10.7999 17.0948 12.417 17.0541C15.0408 16.9882 16.3526 16.9553 17.2953 16.0091C18.2378 15.0629 18.2651 13.7856 18.3195 11.231C18.3371 10.4096 18.3371 9.59305 18.3195 8.77164C18.2651 6.21702 18.2378 4.93971 17.2953 3.99352C16.3526 3.04733 15.0408 3.01437 12.417 2.94844C10.7999 2.90781 9.19877 2.90781 7.5817 2.94844C4.95796 3.01435 3.64608 3.04731 2.70347 3.99351C1.76087 4.9397 1.73363 6.21701 1.67915 8.77164C1.66163 9.59305 1.66164 10.4096 1.67916 11.231Z"
            stroke="#808080"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M1.66602 5L7.42687 8.26414C9.55068 9.4675 10.448 9.4675 12.5718 8.26414L18.3327 5"
            stroke="#808080"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Password":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0765 12.9167H12.084M7.91732 12.9167H7.92482M3.55732 15.7042C3.74482 17.0959 4.89732 18.1867 6.30065 18.2509C7.48065 18.305 8.67982 18.3334 10.0007 18.3334C11.3215 18.3334 12.5207 18.305 13.7007 18.25C15.104 18.1867 16.2565 17.0959 16.444 15.7042C16.5665 14.7959 16.6673 13.865 16.6673 12.9167C16.6673 11.9684 16.5665 11.0375 16.444 10.1292C16.2565 8.73755 15.104 7.64671 13.7007 7.58255C12.4681 7.52622 11.2345 7.49871 10.0007 7.50005C8.67982 7.50005 7.48065 7.52838 6.30065 7.58338C4.89732 7.64671 3.74482 8.73755 3.55732 10.1292C3.43398 11.0375 3.33398 11.9684 3.33398 12.9167C3.33398 13.865 3.43482 14.7959 3.55732 15.7042Z"
            stroke="#808080"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.25 7.5013V5.41797C6.25 4.42341 6.64509 3.46958 7.34835 2.76632C8.05161 2.06306 9.00544 1.66797 10 1.66797C10.9946 1.66797 11.9484 2.06306 12.6516 2.76632C13.3549 3.46958 13.75 4.42341 13.75 5.41797V7.5013"
            stroke="#808080"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "SuperGrow":
      return (
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.17 4.85448C14.9614 5.42448 15.4987 6.30781 15.4987 7.34115C15.4987 8.37448 14.9614 9.25848 14.17 9.82781C14.33 10.7891 14.0807 11.7998 13.352 12.5278C12.622 13.2578 11.612 13.5005 10.6547 13.3445C10.0874 14.1385 9.19603 14.6745 8.16536 14.6745C7.13203 14.6745 6.2467 14.1365 5.67803 13.3438C4.71936 13.5005 3.7087 13.2585 2.97803 12.5278C2.24803 11.7978 2.00536 10.7871 2.1667 9.82781C1.37603 9.25915 0.832031 8.37515 0.832031 7.34115C0.832031 6.30715 1.37603 5.42248 2.1667 4.85448C2.00536 3.89515 2.24803 2.88448 2.9787 2.15448C3.70736 1.42515 4.7187 1.17648 5.68336 1.33648C6.2487 0.543813 7.13403 0.0078125 8.16536 0.0078125C9.19536 0.0078125 10.0854 0.543146 10.6534 1.33648C11.6147 1.17648 12.624 1.42648 13.352 2.15448C14.08 2.88248 14.3307 3.89315 14.17 4.85448ZM11.2194 4.79848C11.2906 4.84934 11.3512 4.91374 11.3976 4.98801C11.4439 5.06227 11.4752 5.14494 11.4897 5.23131C11.5041 5.31767 11.5014 5.40602 11.4816 5.49133C11.4619 5.57663 11.4256 5.65722 11.3747 5.72848L8.04136 10.3951C7.9851 10.474 7.91233 10.5396 7.82814 10.5874C7.74394 10.6352 7.65034 10.6642 7.55383 10.6722C7.45733 10.6802 7.36024 10.667 7.26932 10.6337C7.1784 10.6004 7.09583 10.5476 7.02736 10.4791L5.02736 8.47915C4.90593 8.35341 4.83873 8.18501 4.84025 8.01021C4.84177 7.83541 4.91188 7.66821 5.03549 7.5446C5.15909 7.42099 5.3263 7.35088 5.5011 7.34936C5.6759 7.34784 5.8443 7.41504 5.97003 7.53648L7.41336 8.97981L10.2894 4.95315C10.3922 4.80932 10.5479 4.71222 10.7223 4.68321C10.8967 4.65421 11.0755 4.69567 11.2194 4.79848Z"
            fill="#00701C"
          />
        </svg>
      );
    case "moveBackArrow":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icons;
