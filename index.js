var axios = require('axios')

// var city = 'Ouro Fino'
var key = '05906a229847de9e3d68f7fcc153dff8'
var cityName
exports.getData = (cityName) => {
    /*Essa parte do código é usada para pegar os dados da api com o get, mostrá-los com o console, dentro do .then e, em caso de erro, o mesmo é mostrado pelo console dentro do .catch
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((res) => {console.log(res.data)})
        .catch(err => console.error(err))*/

    //! Se eu quero atribuir os dados da api para uma variável, eu preciso de uma função
    var dados

    function cities() {
        return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
    }

    dados = cities()
    
    return dados
}



