declare namespace NodeJS {
  export interface ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REDIRECT_URI: string;
    NEXT_PUBLIC_APP_URL: string
  }
}