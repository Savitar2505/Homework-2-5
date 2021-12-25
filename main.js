let preloader = document.getElementById('preloader')
document.body.onload=()=>{
    setTimeout(()=>{
        if(!preloader.classList.contains('done')){
            preloader.classList.toggle('done')
        }
    }, 300)
}
let input = document.getElementById('anime')
const animeInfo = document.getElementById('animeInfo')

const anime =() => {
    fetch('https://kitsu.io/api/edge/anime?filter[text]='+input.value).then((data) => {
        data.json().then(response => {
            preloader.classList.toggle('done')
            animeInfo.innerHTML=''
            for(let i= 0; i<10; i++ ){
                const div =document.createElement('div')
                div.className='animeBlock'
                const title = document.createElement('p')
                const type =document.createElement('p')
                const rating = document.createElement('p')
                rating.className='rating'

                const img = document.createElement('img')
                img.setAttribute('src', response.data[i].attributes.posterImage.large)
                title.innerText=response.data[i].attributes.canonicalTitle
                type.innerText=response.data[i].attributes.showType
                rating.innerText=response.data[i].attributes.averageRating


                div.append(img)
                div.append(title)
                div.append(type)
                if(rating.innerText!==''){
                    const ratingBlock = document.createElement('div')
                    const star = document.createElement('img')
                    star.setAttribute('src', 'images/star.png' )
                    star.className="star"
                    ratingBlock.className='ratingBlock'
                    ratingBlock.append(star)
                    ratingBlock.append(rating)
                    div.append(ratingBlock)

                }
                animeInfo.append(div)

            }
        })
    })
    preloader.classList.toggle('done')
}


