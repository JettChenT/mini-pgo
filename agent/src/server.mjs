import express from 'express';
import cors from 'cors';
import fs from 'fs';

export const createServer = () => {
  const server = express();

  server.use(express.json());
  server.use(cors());

  server.post('/data', (req, res) => {
    const { data, fileMap } = req.body;
    console.log("RECEIVE POST", data, fileMap);
    for (const key of Object.keys(data)) {
      const fileLoc = fileMap[key];
      let {count, duration} = data[key];
      console.log(`${fileLoc} ${key}: count=${count} duration=${duration} avg_duration=${duration / Math.max(count, 1)}`);
    }

    const files = new Set(Object.values(fileMap));

    for (const file of files) {
      if (!fs.existsSync(file)) {
        console.error(`File ${file} does not exist`);
        continue;
      }
      const fileContent = fs.readFileSync(file, 'utf8');
    }
    return res.status(200).json({ message: 'Data received' });
  });

  server.listen(6900, () => {
    console.log('Listening on port 6900');
  });
};

createServer();
