export function PhotoItem({id, url, openFullPhoto}){

    return(
        <div className='photo-item'>
            <img src={url} onClick={() => openFullPhoto(id)}/>
        </div>
    )
}