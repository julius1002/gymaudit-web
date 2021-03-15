export interface UserInfo{
    id:string;
    name:string;
    birthday:string;
    picture:Picture;
}

export interface Picture{
    data:PictureData
}

export interface PictureData{
    is_silhouette:boolean;
    width:number;
    url:string;
    height:number

}