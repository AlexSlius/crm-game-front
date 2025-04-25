import { data } from "react-router-dom";

export const defaultDataModalGame = {
    show: false,
    data: {
        id: null,
        name: '',
        image: '',
        cityId: null,
        statusId: 1,
        isPlaces: true,
        places: null,
        time: '',
        day: '',
        description: '',
    }
};

export const defaultDataModalTeam = {
    show: false,
    data: {
        id: null,
        name: "",
        captain: "",
        phone: "",
        chatId: "",
        nicknam: "",
        gameId: null,
        city: null,
        layers: 0,
        playersNew: 0,
        statusId: 1,
        wish: "",
        note: ""
    }
};

export const defaultDataModalQuestion = {
    show: false,
    data: {
        id: null,
        chatId: '-',
        nickname: '',
        name: '',
        phone: '',
        cityId: null,
        team: '',
        question: "",
        answer: "",
        statusId: 9
    }
}