export type User = {
  type_of: "user",
  id: number,
  name: string,
  username: string,
  summary: string,
  twitter_username: string,
  github_username: string,
  website_url: string,
  profile_image: string,
  profile_image_90: string,
  joined_at: string,
}


export const fetchUser = (id: number) => fetch(`https://dev.to/api/users/${id}`)
  .then(r => r.json()) as Promise<User>;

export const fetchUserByUsername = (username: string) => fetch(`https://dev.to/api/users/by_username?url=${username}`)
  .then(r => r.json()) as Promise<User>;
