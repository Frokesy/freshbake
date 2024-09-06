export const DashboardIcon = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 6C2.5 4.11438 2.5 3.17157 3.08579 2.58579C3.67157 2 4.61438 2 6.5 2C8.38562 2 9.32843 2 9.91421 2.58579C10.5 3.17157 10.5 4.11438 10.5 6V8C10.5 9.88562 10.5 10.8284 9.91421 11.4142C9.32843 12 8.38562 12 6.5 12C4.61438 12 3.67157 12 3.08579 11.4142C2.5 10.8284 2.5 9.88562 2.5 8V6Z"
      stroke="#4E410C"
      strokeWidth="1.5"
    />
    <path
      d="M2.5 19C2.5 18.0681 2.5 17.6022 2.65224 17.2346C2.85523 16.7446 3.24458 16.3552 3.73463 16.1522C4.10218 16 4.56812 16 5.5 16H7.5C8.43188 16 8.89782 16 9.26537 16.1522C9.75542 16.3552 10.1448 16.7446 10.3478 17.2346C10.5 17.6022 10.5 18.0681 10.5 19C10.5 19.9319 10.5 20.3978 10.3478 20.7654C10.1448 21.2554 9.75542 21.6448 9.26537 21.8478C8.89782 22 8.43188 22 7.5 22H5.5C4.56812 22 4.10218 22 3.73463 21.8478C3.24458 21.6448 2.85523 21.2554 2.65224 20.7654C2.5 20.3978 2.5 19.9319 2.5 19Z"
      stroke="#4E410C"
      strokeWidth="1.5"
    />
    <path
      d="M14.5 16C14.5 14.1144 14.5 13.1716 15.0858 12.5858C15.6716 12 16.6144 12 18.5 12C20.3856 12 21.3284 12 21.9142 12.5858C22.5 13.1716 22.5 14.1144 22.5 16V18C22.5 19.8856 22.5 20.8284 21.9142 21.4142C21.3284 22 20.3856 22 18.5 22C16.6144 22 15.6716 22 15.0858 21.4142C14.5 20.8284 14.5 19.8856 14.5 18V16Z"
      stroke="#4E410C"
      strokeWidth="1.5"
    />
    <path
      d="M14.5 5C14.5 4.06812 14.5 3.60218 14.6522 3.23463C14.8552 2.74458 15.2446 2.35523 15.7346 2.15224C16.1022 2 16.5681 2 17.5 2H19.5C20.4319 2 20.8978 2 21.2654 2.15224C21.7554 2.35523 22.1448 2.74458 22.3478 3.23463C22.5 3.60218 22.5 4.06812 22.5 5C22.5 5.93188 22.5 6.39782 22.3478 6.76537C22.1448 7.25542 21.7554 7.64477 21.2654 7.84776C20.8978 8 20.4319 8 19.5 8H17.5C16.5681 8 16.1022 8 15.7346 7.84776C15.2446 7.64477 14.8552 7.25542 14.6522 6.76537C14.5 6.39782 14.5 5.93188 14.5 5Z"
      stroke="#4E410C"
      strokeWidth="1.5"
    />
  </svg>
);

export const OrderIcon = ({
  color,
  size,
}: {
  color?: string;
  size?: string;
}) => (
  <svg
    width={size ? size : "24"}
    height={size ? size : "24"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7205 10.6235 21.621 10.747 21.4816 10.8132C20.9033 11.0876 20.4982 11.6081 20.3919 12.2134L19.7993 15.5878C19.5386 17.0725 19.4495 19.1943 18.1484 20.2402C17.1938 21 15.8184 21 13.0675 21H10.9325C8.18162 21 6.8062 21 5.8516 20.2402C4.55052 19.1942 4.46138 17.0725 4.20066 15.5878L3.60807 12.2134C3.50177 11.6081 3.09673 11.0876 2.51841 10.8132C2.37896 10.747 2.27952 10.6235 2.24894 10.4784C2.07874 9.67075 1.6264 8.5469 2.63812 8.10084C2.86684 8 3.17922 8 3.80397 8H7.5"
      stroke={color ? color : "#4E4949"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M14 12H10"
      stroke={color ? color : "#4E4949"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 11L10 3M15 3L17.5 8"
      stroke={color ? color : "#4E4949"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ProductsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 2H4.30116C5.48672 2 6.0795 2 6.4814 2.37142C6.88331 2.74285 6.96165 3.36307 7.11834 4.60351L8.24573 13.5287C8.45464 15.1826 8.5591 16.0095 9.09497 16.5048C9.63085 17 10.4212 17 12.002 17H22"
      stroke="#4E4949"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M11.5 21C12.3284 21 13 20.3284 13 19.5C13 18.6716 12.3284 18 11.5 18C10.6716 18 10 18.6716 10 19.5C10 20.3284 10.6716 21 11.5 21Z"
      stroke="#4E4949"
      strokeWidth="1.5"
    />
    <path
      d="M18.5 21C19.3284 21 20 20.3284 20 19.5C20 18.6716 19.3284 18 18.5 18C17.6716 18 17 18.6716 17 19.5C17 20.3284 17.6716 21 18.5 21Z"
      stroke="#4E4949"
      strokeWidth="1.5"
    />
    <path
      d="M18 14H16C14.1144 14 13.1716 14 12.5858 13.4142C12 12.8284 12 11.8856 12 10V8C12 6.11438 12 5.17157 12.5858 4.58579C13.1716 4 14.1144 4 16 4H18C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8V10C22 11.8856 22 12.8284 21.4142 13.4142C20.8284 14 19.8856 14 18 14Z"
      stroke="#4E4949"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 7H17.5"
      stroke="#4E4949"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlusIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 1V12M12 6.5H1"
      stroke="#704E00"
      strokeWidth="1.03125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BrokenImage = () => (
  <svg
    width="110"
    height="110"
    viewBox="0 0 110 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.8004 69.7441L42.3667 57.9217C42.9819 56.9605 44.3168 56.7897 45.1541 57.565L50.0909 62.1361C50.8431 62.8326 52.0206 62.7762 52.7028 62.0109L61.2832 52.3854C62.0906 51.4797 63.5394 51.595 64.1935 52.6169L75.1549 69.7441C75.9352 70.9634 75.0596 72.5633 73.612 72.5633H36.3433C34.8957 72.5633 34.0201 70.9634 34.8004 69.7441Z"
      stroke="black"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="48.3998"
      cy="43.9997"
      r="5.775"
      stroke="black"
      strokeWidth="1.65"
    />
  </svg>
);
