var axios = require('axios')

// var city = 'Ouro Fino'

    /*Essa parte do código é usada para pegar os dados da api com o get, mostrá-los com o console, dentro do .then e, em caso de erro, o mesmo é mostrado pelo console dentro do .catch
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((res) => {console.log(res.data)})
        .catch(err => console.error(err))*/
var key = "05906a229847de9e3d68f7fcc153dff8"      
var cityName
exports.getData = (cityName) => {
    var dados
    cityName = 'Ouro Fino'
    console.log(cityName)
    var city = cityName.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    
    function cities() {
        return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    }

    dados = cities()
    
    return dados
}



