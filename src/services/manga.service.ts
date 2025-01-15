import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MangaService {
    //getManga_DexById(id: string): Observable<Manga_Dex>

    //getManga_DexByIds(id: string[]): Observable<Manga_Dex[]> 

    //getManga_DexByName(name: string): Observable<Manga_Dex> 

    //getManga_DexByNames(id: string[]): Observable<Manga_Dex[]> 

    //getTopRatedManga_Dex(): Observable<Manga_Dex[]>

    //getLatestManga_Dex(): Observable<Manga_Dex[]>

    //getGermanManaga_Dex(): Observable<Manga_Dex[]>

    //getEnglishManga_Dex(): Observable<Manga_Dex[]>
}

export interface Manga_DB {
    manga_id: string;
    title_de: string;
    cover_url: string;
};

export interface Manga_Dex {
    id: string; //0 .
    defaultTitle: string; //1 .
    germanTitle: string[]; //2
    originalTitle: string[]; //3
    currentCover: string; //4 .
    description: string; //5 .
    contentRating: string; //6
    tags: string[]; //7
    ratingAverage: number; //8 .
    releaseDate: string; //9
    authors: string[]; //10
    artists: string[]; //11
    publicationStatus: string; //12
    followers: number; //13
    commentCount: number; //14
    demographic: string; //15
    originalLanguage: string; //16 .
    lastVolume: number; //17
    lastChapter: number; //18
    ratingBayesian: number; //20
};