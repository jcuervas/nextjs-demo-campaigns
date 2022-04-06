import {FirebaseService} from '@services/firebase-service';
import {Request, Response} from 'express';
import multer from 'multer';
import nextConnect from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
}

const apiRoute = nextConnect({
  onError(error, req: Request, res: Response) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(multer().any());
apiRoute.post(async (req: Request, res: Response) => {
  try {
    const firebaseService = new FirebaseService()
    const {path} = req.body
    const url = await firebaseService.uploadFileToStorage(path, await req.files[0].buffer)
    res.status(200).send(url)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

export default apiRoute

