import * as qiniu from 'qiniu-js'
import api from "./api";
import TokenService from "./token.service";

class QiniuService {
    //从后端获取UpToken
    getUpToken() {
        let token = {}
        api.get("/homo-app/qiniu/token")
            .then(resp => {
                    token.UpToken = resp.UpToken
                    token.Domain = resp.Domain
                    return resp
                },
                err => {
                    return Promise.reject(err)
                })
        return token
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

    let {UpToken, Domain} = qiniuService.getUpToken();
    let timestamp =new Date().getTime();
    let key = timestamp + '' + file.name;
    const observable = qiniu.upload(file, key, UpToken, putExtra, config)
    const subscription = observable.subscribe(observer)
    subscription.unsubscribe() // 上传取消

    //上传成功返回图片外链url
    return Domain + "/" + key
}