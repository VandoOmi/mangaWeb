import { Injectable, inject } from '@angular/core';
import { CsvService } from './csv.service';
import { Observable, elementAt, from, map } from 'rxjs';
import { Firestore, doc, getDoc, collection, query, setDoc, where, docSnapshots, deleteDoc, getDocs } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MangaService {
    db =  inject(Firestore);

    createManga_Db(manga: Manga_DB): Observable<void> {
        const mangaReference = doc(this.db, "manga-data", );
        const promise = setDoc(mangaReference, manga);

        return from(promise);
    }

    getManga_DbById(manga_id: string): Observable<Manga_DB> {
        const document = doc(this.db, "manga-data",manga_id);
        const promise = getDoc(document);

        return from(promise).pipe(
            map((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    return data as Manga_DB;
                } else {
                    throw new Error('Document does not exist');
                }
            })
        )
    }

    getManga_DbByIds(): Observable<Manga_DB[]> {
        const mangaDatabase = collection(this.db, "manga-data");
        const promise = getDocs(mangaDatabase);

        return from(promise).pipe(
            map(
                doc => doc.docs.map(
                    doc => doc.data() as Manga_DB
                ) as Manga_DB[]
            )
        )
    }

    updateManga(manga: Manga_DB): Observable<void>  {
        const mangaRef = doc(this.db, "manga-data", manga.manga_id);
        const promise = setDoc(mangaRef, manga); 

        return from(promise);
    }

    deleteManga(manga_id: string): Observable<void> {
            const mangaRef = doc(this.db, "manga-data", manga_id);
            const  promise = deleteDoc(mangaRef);

            return from(promise)
    };

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
    title: string;
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