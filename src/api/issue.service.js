import api from "./api";


class IssueService {
    list = (subject) => {
        let params = {
            subject: subject,
        }
        return api.get(`/leetroll-app/issue/list`, {params: params})
            .then(resp => {
                return resp
            })
    }

}

export default new IssueService();

