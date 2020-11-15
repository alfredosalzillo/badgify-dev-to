import type from 'https://deno.land/x/servest@v1.1.6/types/react/global.d.ts';
import { ServerRequest } from 'https://deno.land/std@0.77.0/http/server.ts';
// @deno-types="https://deno.land/x/servest@v1.1.6/types/react/index.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1'
// @deno-types="https://deno.land/x/servest@v1.1.6/types/react-dom/server/index.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom@16.13.1/server';
import { fetchUserByUsername, User } from '../lib/users.ts';

const DevLogo = () => (
  <svg
    y="120"
  >
    <rect
      rx="3"
      height="40"
      width="50"
      fill="#000"
    />
    <path
      d="M19.099 23.508c0 1.31-.423 2.388-1.27 3.234-.838.839-1.942 1.258-3.312 1.258h-4.403V12.277h4.492c1.31 0 2.385.423 3.224 1.27.846.838 1.269 1.912 1.269 3.223v6.738zm-2.808 0V16.77c0-.562-.187-.981-.562-1.258-.374-.285-.748-.427-1.122-.427h-1.685v10.107h1.684c.375 0 .75-.138 1.123-.415.375-.285.562-.708.562-1.27zM28.185 28h-5.896c-.562 0-1.03-.187-1.404-.561-.375-.375-.562-.843-.562-1.404V14.243c0-.562.187-1.03.562-1.404.374-.375.842-.562 1.404-.562h5.896v2.808H23.13v3.65h3.088v2.808h-3.088v3.65h5.054V28zm7.12 0c-.936 0-1.684-.655-2.246-1.965l-3.65-13.758h3.089l2.807 10.804 2.808-10.804H41.2l-3.65 13.758C36.99 27.345 36.241 28 35.305 28z"
      style={{ fill: '#fff' }}
    />
  </svg>
);
type NameProps = {
  name: string,
}
const Name = ({ name }: NameProps) => (
  <text
    fontWeight="bold"
    stroke="#000"
    textAnchor="start"
    fontSize="50"
    y="60"
    fillOpacity="null"
    strokeOpacity="null"
    strokeWidth="0"
    fill="#000000"
  >
    {name}
  </text>
);
type UsernameProps = {
  username: string,
}
const Username = ({ username }: UsernameProps) => (
  <text
    fontWeight="bold"
    fontStyle="italic"
    stroke="#000"
    textAnchor="start"
    fontSize="32"
    y="100"
    strokeOpacity="null"
    strokeWidth="0"
    fill="#444444"
  >
    @{username}
  </text>
)

type UserBadgeProps = {
  user: User,
  profileImage: string,
}
const User = ({ user, profileImage }: UserBadgeProps) => (
  <svg width="700" height="170" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect fill="#fff" strokeWidth="0" height="100%" width="100%" y="0" x="0"/>
    </g>
    <g>
      <image
        href={profileImage}
        x="1"
        y="1"
        height="168"
        width="168"
      />
      <svg x="180" fontFamily="sans-serif">
        <Name name={user.name}/>
        <Username username={user.username}/>
        <DevLogo/>
      </svg>
    </g>
    <g>
      <rect stroke="#000" fill="transparent" strokeWidth="2" height="100%" width="100%" y="0" x="0"/>
    </g>
  </svg>
)

const toDataURL = (url: string): Promise<string> => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve((reader.result as string).replace('application/octet-stream', 'image/png'))
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
export default async (req: ServerRequest) => {
  const url = new URL(req.url, 'http://localhost');
  const urlSearchParams = new URLSearchParams(url.search.slice(1));
  const username = urlSearchParams.get('username');
  if (!username) {
    req.respond({ status: 404 })
    return;
  }
  const user = await fetchUserByUsername(username);
  if (!user) {
    req.respond({ status: 404 })
    return;
  }
  const image = await toDataURL(user.profile_image);
  console.log(image)
  req.respond({
    headers: new Headers({
      'Content-Type': 'image/svg+xml'
    }),
    body: ReactDOMServer.renderToStaticMarkup(<User
      user={user}
      profileImage={image}
    />),
  });
};
