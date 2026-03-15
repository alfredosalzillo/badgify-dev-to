import type { User } from "@/plugins/dev-to/users";
import React from "react";

const palette = {
  light: {
    background: "#fff",
    border: "#000",
    name: "#000",
    username: "#444444",
    logoBackground: "#000",
    logoIcon: "#fff",
  },
  dark: {
    background: "#000",
    border: "#fff",
    name: "#fff",
    username: "#cccccc",
    logoBackground: "#fff",
    logoIcon: "#000",
  },
};

type DevLogoProps = {
  theme?: "light" | "dark";
};

const DevLogo = ({ theme = "light" }: DevLogoProps) => (
  <svg y="120">
    <title>Dev.to Logo</title>
    <rect rx="3" height="40" width="50" fill={palette[theme].logoBackground} />
    <path
      d="M19.099 23.508c0 1.31-.423 2.388-1.27 3.234-.838.839-1.942 1.258-3.312 1.258h-4.403V12.277h4.492c1.31 0 2.385.423 3.224 1.27.846.838 1.269 1.912 1.269 3.223v6.738zm-2.808 0V16.77c0-.562-.187-.981-.562-1.258-.374-.285-.748-.427-1.122-.427h-1.685v10.107h1.684c.375 0 .75-.138 1.123-.415.375-.285.562-.708.562-1.27zM28.185 28h-5.896c-.562 0-1.03-.187-1.404-.561-.375-.375-.562-.843-.562-1.404V14.243c0-.562.187-1.03.562-1.404.374-.375.842-.562 1.404-.562h5.896v2.808H23.13v3.65h3.088v2.808h-3.088v3.65h5.054V28zm7.12 0c-.936 0-1.684-.655-2.246-1.965l-3.65-13.758h3.089l2.807 10.804 2.808-10.804H41.2l-3.65 13.758C36.99 27.345 36.241 28 35.305 28z"
      style={{ fill: palette[theme].logoIcon }}
    />
  </svg>
);

type NameProps = {
  name: string;
  theme?: "light" | "dark";
};

const Name = ({ name, theme = "light" }: NameProps) => (
  <text
    fontWeight="bold"
    stroke={palette[theme].border}
    textAnchor="start"
    fontSize="50"
    y="60"
    fillOpacity="null"
    strokeOpacity="null"
    strokeWidth="0"
    fill={palette[theme].name}
  >
    {name}
  </text>
);

type UsernameProps = {
  username: string;
  theme?: "light" | "dark";
};

const Username = ({ username, theme = "light" }: UsernameProps) => (
  <text
    fontWeight="bold"
    fontStyle="italic"
    stroke={palette[theme].border}
    textAnchor="start"
    fontSize="32"
    y="100"
    strokeOpacity="null"
    strokeWidth="0"
    fill={palette[theme].username}
  >
    @{username}
  </text>
);

type UserBadgeProps = {
  user: User;
  profileImage?: string;
  theme?: "light" | "dark";
};

export const UserBadge = ({
  user,
  profileImage,
  theme = "light",
}: UserBadgeProps) => (
  <svg width="700" height="170" xmlns="http://www.w3.org/2000/svg">
    <title>{`Dev.to Badge for ${user.username}`}</title>
    <g>
      <rect
        fill={palette[theme].background}
        strokeWidth="0"
        height="100%"
        width="100%"
        y="0"
        x="0"
      />
    </g>
    <g>
      <image
        href={profileImage ?? user.profile_image}
        x="1"
        y="1"
        height="168"
        width="168"
      />
      <svg x="180" fontFamily="sans-serif">
        <title>User Information</title>
        <Name name={user.name} theme={theme} />
        <Username username={user.username} theme={theme} />
        <DevLogo theme={theme} />
      </svg>
    </g>
    <g>
      <rect
        stroke={palette[theme].border}
        fill="transparent"
        strokeWidth="2"
        height="100%"
        width="100%"
        y="0"
        x="0"
      />
    </g>
  </svg>
);
