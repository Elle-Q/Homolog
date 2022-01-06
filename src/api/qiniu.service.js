import * as qiniu from 'qiniu-js'
import api from "./api";
import TokenService from "./token.service";

class QiniuService {
    //从后端获取UpToken
    getUpToken() {
        let token;
        api.get("/homo-app/qiniu/token")
            .then(resp => {
                    token = resp;
                },
                err => {
                    return Promise.reject(err)
                })
        return token;
    }
}

const qiniuService =  new QiniuService()



export const upload = (file) => {
    const observer = {
        next(res){
            console.log("next")
        },
        error(err){
            console.log("error")
        },
        complete(res){
            console.log("complete")
        }
    }

    const config = {
        useCdnDomain: true,
        region: qiniu.region.z2
    };

    const putExtra = {
    };

    let upToken = qiniuService.getUpToken();
    let timestamp =new Date().getTime();
    let key = timestamp + '' + file.name;
    const observable = qiniu.upload(file, key, upToken, putExtra, config)
    const subscription = observable.subscribe(observer)
    subscription.unsubscribe() // 上传取消
}