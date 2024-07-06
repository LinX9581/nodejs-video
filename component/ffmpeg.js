import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';

const inputPath = '/devops/234.mp4';
const outputPath = '/devops/2_audio.mp3';

async function extractAudio(inputPath, outputPath) {
  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .noVideo()
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    console.log('Audio extraction finished.');
    const stats = await fs.stat(outputPath);
    console.log(`Extracted audio file size: ${stats.size / (1024 * 1024)} MB`);
  } catch (err) {
    console.error('Error during audio extraction:', err);
  }
}

extractAudio(inputPath, outputPath);