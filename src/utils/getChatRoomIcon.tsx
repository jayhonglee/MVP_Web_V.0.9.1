export default function getChatRoomIcon(name: string) {
  switch (name) {
    case "info":
      return (
        <svg
          aria-label="Conversation information"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Conversation information</title>
          <circle
            cx="12.001"
            cy="12.005"
            fill="none"
            r="10.5"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></circle>
          <circle cx="11.819" cy="7.709" r="1.25"></circle>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="10.569"
            x2="13.432"
            y1="16.777"
            y2="16.777"
          ></line>
          <polyline
            fill="none"
            points="10.569 11.05 12 11.05 12 16.777"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></polyline>
        </svg>
      );
    case "back":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="w-[20px] h-[20px]"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      );
    default:
      return null;
  }
}
