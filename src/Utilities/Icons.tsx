import React from "react";

interface IconsProps {
  variant: string;
  strokeColor?: string;
}

const Icons: React.FC<IconsProps> = ({ variant, strokeColor }) => {
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
    case "prev":
      return (
        <svg
          width="7"
          height="24"
          viewBox="0 0 7 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.12121 1L1 5.12121L5.12121 9.5"
            stroke={strokeColor ? strokeColor : "#747688"}
            strokeWidth={"2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "next":
      return (
        <svg
          width="7"
          height="24"
          viewBox="0 0 7 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.999882 1L5.12109 5.12121L0.999882 9.5"
            stroke={strokeColor ? strokeColor : "#747688"}
            strokeWidth={"2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "PriceBadge":
      return (
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_695_8687)">
            <path
              d="M21.9115 9.21611V3.28091C21.9124 2.99714 21.8572 2.71598 21.7492 2.45359C21.6411 2.19119 21.4823 1.95272 21.2819 1.75186C21.0814 1.551 20.8433 1.39171 20.5811 1.28313C20.3189 1.17455 20.0379 1.11882 19.7541 1.11914H13.8223C13.4333 1.11994 13.0604 1.27408 12.7843 1.54812L0.925512 13.4036C0.521057 13.8093 0.293945 14.3589 0.293945 14.9318C0.293945 15.5047 0.521057 16.0542 0.925512 16.46L6.57119 22.1056C6.9768 22.5102 7.52628 22.7374 8.09914 22.7374C8.67201 22.7374 9.22149 22.5102 9.6271 22.1056L21.4825 10.254C21.7567 9.97808 21.9108 9.60509 21.9115 9.21611ZM17.2792 7.29561C16.9738 7.29561 16.6752 7.20505 16.4213 7.03538C16.1674 6.86571 15.9695 6.62455 15.8526 6.3424C15.7357 6.06025 15.7051 5.74978 15.7647 5.45025C15.8243 5.15072 15.9714 4.87559 16.1873 4.65964C16.4033 4.44369 16.6784 4.29663 16.9779 4.23705C17.2775 4.17747 17.5879 4.20805 17.8701 4.32492C18.1522 4.44179 18.3934 4.6397 18.5631 4.89363C18.7327 5.14756 18.8233 5.4461 18.8233 5.75149C18.8233 6.16102 18.6606 6.55377 18.371 6.84335C18.0814 7.13293 17.6887 7.29561 17.2792 7.29561Z"
              fill="#00701C"
            />
            <path
              d="M24.228 3.43555C24.0232 3.43555 23.8268 3.51689 23.682 3.66168C23.5372 3.80647 23.4559 4.00284 23.4559 4.20761V10.3537L10.8467 22.9633C10.772 23.0343 10.7123 23.1195 10.671 23.214C10.6298 23.3084 10.6078 23.4101 10.6065 23.5132C10.6052 23.6162 10.6245 23.7185 10.6633 23.8139C10.7022 23.9094 10.7597 23.9961 10.8326 24.069C10.9054 24.1418 10.9922 24.1994 11.0876 24.2382C11.1831 24.277 11.2853 24.2964 11.3884 24.295C11.4914 24.2937 11.5932 24.2718 11.6876 24.2305C11.782 24.1893 11.8673 24.1295 11.9382 24.0548L24.5807 11.4124C24.7152 11.2773 24.8215 11.1168 24.8935 10.9403C24.9655 10.7638 25.0017 10.5747 25 10.3841V4.20761C25 4.00284 24.9187 3.80647 24.7739 3.66168C24.6291 3.51689 24.4327 3.43555 24.228 3.43555Z"
              fill="#00701C"
            />
          </g>
          <defs>
            <clipPath id="clip0_695_8687">
              <rect
                width="24.7059"
                height="24.7059"
                fill="white"
                transform="translate(0.293945 0.347656)"
              />
            </clipPath>
          </defs>
        </svg>
      );
    case "Inbox":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16C8.15977 16 7.35623 15.8524 6.61247 15.5826C6.28463 15.4636 5.92007 15.437 5.56448 15.5244C4.60939 15.759 3.63437 15.9078 2.65106 15.9686C3.02083 14.9944 3.14858 13.9412 3.01859 12.9008C2.98967 12.6694 2.91398 12.4664 2.82407 12.2985C2.29846 11.3167 2 10.1947 2 9C2 5.13401 5.13401 2 9 2ZM18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 10.5167 0.375978 11.9485 1.04062 13.2044C1.14435 14.1303 0.952122 15.0682 0.487331 15.8816L0.446316 15.9533C-0.0748005 16.8653 0.583683 18 1.63403 18C3.10189 18 4.56133 17.8251 5.98192 17.4812C6.92665 17.8174 7.94307 18 9 18C13.9706 18 18 13.9706 18 9ZM20.3552 8.25812C19.9331 8.61423 19.8795 9.24513 20.2356 9.66727C21.3371 10.973 22 12.6578 22 14.5C22 15.7826 21.6789 16.9872 21.1135 18.0408C21.0228 18.2097 20.9476 18.4124 20.9185 18.6425C20.7755 19.7732 20.9218 20.9185 21.3392 21.9723C20.2529 21.9111 19.1756 21.7493 18.1212 21.4894C17.7653 21.4017 17.3998 21.4281 17.0708 21.5481C16.2702 21.8402 15.4049 22 14.5 22C12.6578 22 10.973 21.3371 9.66727 20.2356C9.24512 19.8795 8.61423 19.9331 8.25812 20.3552C7.90201 20.7774 7.95555 21.4083 8.3777 21.7644C10.0307 23.1588 12.1684 24 14.5 24C15.6223 24 16.7012 23.805 17.7033 23.4461C19.2136 23.8133 20.7654 24 22.3263 24C23.3943 24 24.0639 22.8462 23.534 21.919L23.534 21.9189L23.4904 21.8427C22.988 20.9635 22.7814 19.9491 22.896 18.9484C23.601 17.6203 24 16.1053 24 14.5C24 12.1684 23.1587 10.0307 21.7644 8.3777C21.4083 7.95555 20.7774 7.90202 20.3552 8.25812ZM5 10C5.55228 10 6 9.55229 6 9C6 8.44772 5.55228 8 5 8C4.44772 8 4 8.44772 4 9C4 9.55229 4.44772 10 5 10ZM10 9C10 9.55229 9.55229 10 9 10C8.44771 10 8 9.55229 8 9C8 8.44772 8.44771 8 9 8C9.55229 8 10 8.44772 10 9ZM13 10C13.5523 10 14 9.55229 14 9C14 8.44772 13.5523 8 13 8C12.4477 8 12 8.44772 12 9C12 9.55229 12.4477 10 13 10Z"
            fill={strokeColor}
          />
        </svg>
      );
    case "CreateAlbum":
      return (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 7H13C12.4 7 12 7.4 12 8C12 8.6 12.4 9 13 9H15C15.6 9 16 9.4 16 10V17C16 17.6 15.6 18 15 18H3C2.4 18 2 17.6 2 17V10C2 9.4 2.4 9 3 9H5C5.6 9 6 8.6 6 8C6 7.4 5.6 7 5 7H3C1.3 7 0 8.3 0 10V17C0 18.7 1.3 20 3 20H15C16.7 20 18 18.7 18 17V10C18 8.3 16.7 7 15 7ZM6.7 4.7L8 3.4V15C8 15.6 8.4 16 9 16C9.6 16 10 15.6 10 15V3.4L11.3 4.7C11.5 4.9 11.7 5 12 5C12.3 5 12.5 4.9 12.7 4.7C13.1 4.3 13.1 3.7 12.7 3.3L9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5.3 3.3C4.9 3.7 4.9 4.3 5.3 4.7C5.7 5.1 6.3 5.1 6.7 4.7Z"
            fill={strokeColor}
          />
        </svg>
      );
    case "YourAlbum":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1943 15.793C19.8443 18.273 19.6693 19.514 18.7723 20.257C17.8753 21 16.5523 21 13.9053 21H8.09533C5.44933 21 4.12533 21 3.22833 20.257C2.33133 19.514 2.15633 18.274 1.80633 15.793L1.38433 12.793C0.937329 9.629 0.714329 8.048 1.66233 7.023C2.61033 6 4.29833 6 7.67233 6H14.3283C17.7023 6 19.3903 6 20.3383 7.024C21.0873 7.833 21.1053 8.99 20.8593 11"
            stroke={strokeColor}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M18.5623 6C18.616 5.69354 18.6019 5.37903 18.5212 5.07857C18.4404 4.7781 18.2949 4.49895 18.0947 4.26071C17.8946 4.02248 17.6448 3.83093 17.3628 3.69951C17.0807 3.5681 16.7734 3.5 16.4622 3.5H5.53825C5.22712 3.5 4.91975 3.5681 4.63774 3.69951C4.35572 3.83093 4.10589 4.02248 3.90577 4.26071C3.70565 4.49895 3.5601 4.7781 3.47933 5.07857C3.39857 5.37903 3.38455 5.69354 3.43825 6M16.5002 3.5C16.5282 3.24 16.5432 3.111 16.5432 3.004C16.5443 2.50969 16.3623 2.0325 16.0323 1.66446C15.7023 1.29643 15.2477 1.06364 14.7562 1.011C14.6502 1 14.5203 1 14.2603 1H7.74025C7.48025 1 7.34925 1 7.24325 1.011C6.75175 1.06364 6.29716 1.29643 5.96717 1.66446C5.63718 2.0325 5.45517 2.50969 5.45625 3.004C5.45625 3.111 5.47025 3.241 5.49925 3.5"
            stroke={strokeColor}
            stroke-width="1.5"
          />
          <path
            d="M15.5 12C16.3284 12 17 11.3284 17 10.5C17 9.67157 16.3284 9 15.5 9C14.6716 9 14 9.67157 14 10.5C14 11.3284 14.6716 12 15.5 12Z"
            stroke={strokeColor}
            stroke-width="1.5"
          />
          <path
            d="M19.0002 19L16.1162 16.851C15.1862 16.159 13.8002 16.09 12.7762 16.685L12.5102 16.84C11.7982 17.254 10.8302 17.185 10.2162 16.676L6.37716 13.499C5.61116 12.865 4.38216 12.831 3.56716 13.421L2.24316 14.381"
            stroke={strokeColor}
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      );
    case "Subscriptions":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 9.5H21.5M2.5 9.5V20.5C2.5 20.7652 2.60536 21.0196 2.79289 21.2071C2.98043 21.3946 3.23478 21.5 3.5 21.5H20.5C20.7652 21.5 21.0196 21.3946 21.2071 21.2071C21.3946 21.0196 21.5 20.7652 21.5 20.5V9.5M2.5 9.5V5C2.5 4.73478 2.60536 4.48043 2.79289 4.29289C2.98043 4.10536 3.23478 4 3.5 4H20.5C20.7652 4 21.0196 4.10536 21.2071 4.29289C21.3946 4.48043 21.5 4.73478 21.5 5V9.5"
            stroke={strokeColor}
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M8 15.5L11 18.5L17 12.5"
            stroke={strokeColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 2.5V6.5M16 2.5V6.5"
            stroke={strokeColor}
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      );
    case "Pin":
      return (
        <svg
          width="16"
          height="21"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.96973 10V13.5C7.96973 15.43 9.53973 17 11.4697 17C13.3997 17 14.9697 15.43 14.9697 13.5V8C14.9697 4.13 11.8397 1 7.96973 1C4.09973 1 0.969727 4.13 0.969727 8V14C0.969727 17.31 3.65973 20 6.96973 20"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case "messageSendButton":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1401 0.960043L5.11012 3.96004C-0.959883 5.99004 -0.959883 9.30004 5.11012 11.32L7.79012 12.21L8.68012 14.89C10.7001 20.96 14.0201 20.96 16.0401 14.89L19.0501 5.87004C20.3901 1.82004 18.1901 -0.389957 14.1401 0.960043ZM14.4601 6.34004L10.6601 10.16C10.5101 10.31 10.3201 10.38 10.1301 10.38C9.94012 10.38 9.75012 10.31 9.60012 10.16C9.46064 10.0189 9.38242 9.82847 9.38242 9.63004C9.38242 9.43161 9.46064 9.24118 9.60012 9.10004L13.4001 5.28004C13.6901 4.99004 14.1701 4.99004 14.4601 5.28004C14.7501 5.57004 14.7501 6.05004 14.4601 6.34004Z"
            fill="#00701C"
          />
        </svg>
      );
    case "Album":
      return (
        <svg
          width="251"
          height="200"
          viewBox="0 0 251 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="250" height="200" fill="white" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.5 134H154.5C155.015 134 155.517 133.944 156 133.839C156.483 133.944 156.985 134 157.5 134H209.5C213.366 134 216.5 130.866 216.5 127C216.5 123.134 213.366 120 209.5 120H203.5C199.634 120 196.5 116.866 196.5 113C196.5 109.134 199.634 106 203.5 106H222.5C226.366 106 229.5 102.866 229.5 99C229.5 95.134 226.366 92 222.5 92H200.5C204.366 92 207.5 88.866 207.5 85C207.5 81.134 204.366 78 200.5 78H136.5C140.366 78 143.5 74.866 143.5 71C143.5 67.134 140.366 64 136.5 64H79.5C75.634 64 72.5 67.134 72.5 71C72.5 74.866 75.634 78 79.5 78H39.5C35.634 78 32.5 81.134 32.5 85C32.5 88.866 35.634 92 39.5 92H64.5C68.366 92 71.5 95.134 71.5 99C71.5 102.866 68.366 106 64.5 106H24.5C20.634 106 17.5 109.134 17.5 113C17.5 116.866 20.634 120 24.5 120H63.5C59.634 120 56.5 123.134 56.5 127C56.5 130.866 59.634 134 63.5 134ZM226.5 134C230.366 134 233.5 130.866 233.5 127C233.5 123.134 230.366 120 226.5 120C222.634 120 219.5 123.134 219.5 127C219.5 130.866 222.634 134 226.5 134Z"
            fill="#F3F3F3"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M86.7783 139.123L82.7081 139.695C80.5205 140.002 78.4978 138.478 78.1904 136.291L67.0565 57.0691C66.7491 54.8815 68.2733 52.8588 70.4609 52.5513L148.692 41.5567C150.88 41.2492 152.902 42.7734 153.21 44.961C153.21 44.961 153.922 50.0264 154.167 51.7688"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M89.305 134.713L85.6092 135.238C83.6227 135.52 81.7886 134.139 81.5126 132.153L71.5174 60.2281C71.2414 58.242 72.628 56.403 74.6145 56.1207L145.652 46.0239C147.638 45.7416 149.473 47.1228 149.749 49.1089L150.608 55.2897C150.654 55.6241 153.723 77.8236 159.813 121.888C160.119 124.101 158.593 126.145 156.405 126.454C156.382 126.458 156.358 126.461 156.335 126.464L89.305 134.713Z"
            fill="#F3F3F3"
          />
          <path
            d="M86.7783 139.123L82.7081 139.695C80.5205 140.002 78.4978 138.478 78.1904 136.291L67.0565 57.0691C66.7491 54.8815 68.2733 52.8588 70.4609 52.5513L148.692 41.5567C150.88 41.2492 152.902 42.7734 153.21 44.961C153.21 44.961 153.922 50.0264 154.167 51.7688"
            stroke="#808080"
            stroke-opacity="0.32"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            d="M155 56.3794L155.5 59.4998"
            stroke="#808080"
            stroke-opacity="0.32"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M99.0799 60.3575C99.3109 58.1604 101.279 56.5666 103.476 56.7975L182.043 65.0553C184.24 65.2862 185.834 67.2544 185.603 69.4515L177.241 149.013C177.01 151.21 175.042 152.804 172.845 152.573L94.2776 144.315C92.0806 144.085 90.4867 142.116 90.7177 139.919L99.0799 60.3575Z"
            fill="white"
          />
          <path
            d="M100.323 60.4881C100.482 58.9777 101.835 57.8819 103.345 58.0407L181.913 66.2984C183.423 66.4572 184.519 67.8103 184.36 69.3208L175.998 148.883C175.839 150.393 174.486 151.489 172.976 151.33L94.4083 143.072C92.8978 142.914 91.8021 141.56 91.9608 140.05L100.323 60.4881Z"
            stroke="#808080"
            stroke-opacity="0.32"
            stroke-width="2.5"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M107.194 69.2546C107.367 67.6068 108.844 66.4114 110.491 66.5846L173.146 73.1699C174.794 73.3431 175.989 74.8192 175.816 76.467L170.276 129.177C170.103 130.824 168.627 132.02 166.979 131.847L104.324 125.261C102.676 125.088 101.481 123.612 101.654 121.964L107.194 69.2546Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M110.241 109.878L120.038 103.27C121.672 102.168 123.865 102.42 125.206 103.864L132.379 111.587C132.737 111.972 133.333 112.014 133.742 111.683L149.081 99.2534C150.929 97.7561 153.667 98.1922 154.959 100.189L164.94 115.627L166.373 118.019L165.687 126.143C165.639 126.704 165.139 127.115 164.58 127.053L107.617 120.724C107.075 120.664 106.682 120.181 106.732 119.639L107.487 111.44L110.241 109.878Z"
            fill="#F3F3F3"
          />
          <path
            d="M108.437 69.3852C108.538 68.424 109.4 67.7267 110.361 67.8277L173.016 74.413C173.977 74.5141 174.674 75.3752 174.573 76.3364L169.033 129.046C168.932 130.007 168.071 130.705 167.11 130.604L104.455 124.018C103.494 123.917 102.796 123.056 102.897 122.095L108.437 69.3852Z"
            stroke="#808080"
            stroke-opacity="0.32"
            stroke-width="2.5"
          />
          <circle
            cx="122.533"
            cy="85.9493"
            r="6"
            transform="rotate(6 122.533 85.9493)"
            fill="#F3F3F3"
            stroke="#808080"
            stroke-opacity="0.32"
            stroke-width="2.5"
          />
          <path
            d="M108.23 111.424C112.167 108.706 120.039 103.269 120.039 103.269C121.673 102.167 123.866 102.42 125.207 103.863L132.38 111.586C132.738 111.972 133.334 112.014 133.743 111.683L149.083 99.253C150.799 97.8622 153.318 98.1262 154.709 99.8426C154.798 99.9535 154.882 100.069 154.96 100.189C154.96 100.189 163.928 114.42 166.024 117.745"
            stroke="#808080"
            stroke-opacity="0.32"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default Icons;
