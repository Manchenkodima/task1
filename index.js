async function abc (){
    let responce = await fetch('https://bipbap.ru/pictures/samye-krasivye-kartinki-35-foto.html')
    let result = responce.json()
    console.log(result)
}
abc()
