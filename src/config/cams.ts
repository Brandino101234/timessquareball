/**
 * Live Ball cams.
 *
 * Swap `streamUrl` for each cam with the HLS (.m3u8) URL from the streaming provider.
 * The pages and the LiveCam player read from here; no other file needs to change.
 *
 * For reference, the streams used on the old site (October 2026) were:
 *   Cam 1: https://cdn3.wowza.com/1/TklSZG5RQTRoaGZr/dGVWVyt0/hls/live/playlist.m3u8
 *   Cam 2: https://cdn3.wowza.com/1/ZTMzVHJwWHROUHVO/b2pIQTFs/hls/live/playlist.m3u8
 */
import type { ImageMetadata } from 'astro';
import cam1Poster from '../assets/press-photos/ball-photos/TS2026_Constellation-Ball_15.jpg';
import cam2Poster from '../assets/press-photos/ball-photos/TS2026_Constellation-Ball_16.jpg';

export interface Cam {
  id: 'cam-1' | 'cam-2';
  /** URL path, e.g. /ball-cam-1 */
  slug: string;
  title: string;
  description: string;
  streamUrl: string;
  /** Still image shown while the stream loads or when the cam is offline. */
  poster: ImageMetadata;
}

export const cams: Cam[] = [
  {
    id: 'cam-1',
    slug: 'ball-cam-1',
    title: 'Ball Cam 1',
    description: 'A live view of the Ball atop One Times Square.',
    streamUrl: 'https://stream.example.com/ball-cam-1/playlist.m3u8',
    poster: cam1Poster,
  },
  {
    id: 'cam-2',
    slug: 'ball-cam-2',
    title: 'Ball Cam 2',
    description: 'A second live angle on the Ball and Times Square below.',
    streamUrl: 'https://stream.example.com/ball-cam-2/playlist.m3u8',
    poster: cam2Poster,
  },
];
