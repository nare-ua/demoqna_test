// API관련공통함수
import axios from "axios";

export default {
    /*
     qna 전용
    1) 값 셋팅
    params = {
        "question_type":_question_type,
        "text":_text
    }
    
    */

    requestAPIQNA (params) {
        let url="http://211.248.186.164:18111/questions";
        return (
            axios.post(url, {
                question_type: params.question_type,
                text: params.text
            },
            {
                headers:{
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            })
        );
    },

    /*
    prompt 및 디자인값 넘기기 위한 함수
    1) 값 셋팅
    params = {
        "engine"              : _engine,
        "prompt"              : _prompt,
        "temperature"         : _temperature,
        "max_tokens"          : _max_tokens,
        "top_p"               : _top_p,
        "frequency_penalty"   : _frequency_penalty,
        "presence_penalty"    : _presence_penalty,
        "best_of"             : _best_of,
        "stop"                : _stop,
    }
    2) requestAPI (params) 를 axios처럼 사용.
    */
    requestAPI (params) {
        console.log("apiCon ::", params)
        // 주소는 고정
        let _url = "http://211.248.186.164:18111/passthru";
        return (
            axios.post(_url, {
                params,
            }, {
                headers:{
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            })
        );

    }
}