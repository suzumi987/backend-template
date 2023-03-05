import { Request, Response, Router } from 'express';
import { ApiModel } from '@models/api/Api.model';
const router = Router()

router.get('/facebook/link', async (req: Request, res: Response) => {
    // const lotterCtr: ILotterCtr = new LotterCtr()
    // const lotter: IDBRespLotto = await lotterCtr.getResultLotter(CODE_NAME.LOTTER_HANOI_EXTRA)
    const apiModel = new ApiModel('lotter', 200000, '_EDEV_MESSAGE.SUCCESS.devMessage')
    res.status(200).json(apiModel.response())
})

router.get('/google/link', async (req: Request, res: Response) => {
    // const lotterCtr: ILotterCtr = new LotterCtr()
    // const lotter: IDBRespLotto = await lotterCtr.getResultLotter(CODE_NAME.LOTTER_HANOI_EXTRA)
    const apiModel = new ApiModel('lotter', 200000, '_EDEV_MESSAGE.SUCCESS.devMessage')
    res.status(200).json(apiModel.response())
})

export default router