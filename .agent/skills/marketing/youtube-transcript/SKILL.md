---
name: youtube-transcript
description: Download video transcripts when provided with a URL.
---

# Video Transcript Downloader

## When to Use This Skill
Activate this skill when:
- Provided with a video URL and a transcript is needed.
- Tasked to "download transcript".
- Asked to "get captions" or "get subtitles" from a video.
- Asked to "transcribe a video".
- Need text content from a video source.

## How It Works

### Priority Order:
1.  **Manual Subtitles**: Download official manual subtitles if available.
2.  **Auto-generated Subtitles**: Fallback to automatic captions/subtitles.
3.  **Local/Whisper Transcription**: Last resort for videos with no subtitles (requires confirmation).

## Technical Process
1.  **Environment Check**: Verify downloader tools are available.
2.  **Subtitles Listing**: List all available subtitles for the given URL.
3.  **Extraction**:
    - Try to download manual subtitles in VTT or similar format.
    - If unavailable, download auto-generated subtitles.
    - If both fail, download audio (e.g., mp3) and use transcription models to generate text.
4.  **Conversion & Cleaning**:
    - Convert subtitle files to clean plain text.
    - Remove metadata headers (e.g., WEBVTT, Kind, Language).
    - Deduplicate identical lines/timestamps.
5.  **Output**: Save as `{Title}.txt`.

## Output Formats
- **Raw format (.vtt)**: Timestamps and formatting.
- **Plain text (.txt)**: Cleaned text content for analysis.

## Tips
- Most platforms have auto-generated English subtitles.
- If auto-subtitles aren't available, specific flags for manual subtitles might be needed.
- For high-quality results, always prefer manual subtitles.
