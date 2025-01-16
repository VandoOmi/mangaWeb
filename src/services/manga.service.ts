import { Injectable, inject } from '@angular/core';
import { Observable, from, map, forkJoin, of } from 'rxjs';
import { Firestore, doc, getDoc, collection, setDoc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import axios from 'axios'; //muss installiert werden npm install axios 
import { switchMap } from 'rxjs/operators';
import { limit } from 'firebase/firestore';
@Injectable({
    providedIn: 'root'
})
export class MangaService {
    private readonly BASE_URL = 'https://api.mangadex.org';
    db = inject(Firestore);
    private httpClient = inject(HttpClient);

    createManga_Db(manga: Manga_DB): Observable<void> {
        if (!manga.manga_id) {
            throw new Error('Manga ID ist erforderlich, um ein Dokument zu erstellen.');
        }
        const mangaReference = doc(this.db, "manga-data", manga.manga_id); 
        const promise = setDoc(mangaReference, manga);
    
        return from(promise);
    }
    

    getManga_DbById(manga_id: string): Observable<Manga_DB> {
        const document = doc(this.db, "manga-data", manga_id);
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

    updateManga(manga: Manga_DB): Observable<void> {
        const mangaRef = doc(this.db, "manga-data", manga.manga_id);
        const promise = setDoc(mangaRef, manga);

        return from(promise);
    }

    deleteManga(manga_id: string): Observable<void> {
        const mangaRef = doc(this.db, "manga-data", manga_id);
        const promise = deleteDoc(mangaRef);

        return from(promise)
    };

    // laden der mangadex api daten 
    getManga_DexById(mangaId: string): Observable<Manga_Dex> {
        return from(axios.get(`${this.BASE_URL}/manga/${mangaId}`)).pipe(
            switchMap(response => from(this.mapMangaData(response.data)))
        );
    }

    // ein array aus mangaids gibt alle mangas mit den ids zurück
    getManga_DexByIds(ids: string[]): Observable<Manga_Dex[]> {
        const observables: Observable<Manga_Dex>[] = ids.map((item) => this.getManga_DexById(item));
        return forkJoin(observables);
    }

    // laden der mangadex api daten zu allen gespeicherten ids in firestore
    getAllManga_Dex(): Observable<Manga_Dex[]> {
        return this.getManga_DbByIds().pipe(
            switchMap((mangaDbArray) => {
                const mangaIds = mangaDbArray.map(manga => manga.manga_id);
                const mangaRequests = mangaIds.map((mangaId) => this.getManga_DexById(mangaId));
                return forkJoin(mangaRequests);
            })
        );
    }


    // Laden der 10 bestbewerteten Mangas in Mangadex und auch speichern dieser
    getTopRatedManga_Dex(): Observable<Manga_Dex[]> {
        const url = `${this.BASE_URL}/manga?order[rating]=desc&limit=10`;
        return from(axios.get(url)).pipe(
            switchMap(response => {
                //API-Daten zu Manga_Dex
                const topRatedMangas = response.data.data.map((manga: any) => this.mapMangaData(manga));
                const mangaObservables: Observable<void>[] = topRatedMangas.map((manga: Manga_Dex) => this.createManga_Db({
                    manga_id: manga.id,
                    title: manga.defaultTitle,
                    cover_url: manga.currentCover
                }));
                return forkJoin(mangaObservables).pipe(
                    map(() => topRatedMangas) // Hier geben wir die Liste der Manga_Dex zurück
                );
            })
        );
    }

    // Laden der 10 zuletzt hochgeladenen Mangas in Mangadex und auch speichern dieser
    getLatestManga_Dex(): Observable<Manga_Dex[]> {
        const tempM = axios({
            method: 'get',
            url: 'https://api.mangadex.org/manga',
            params: {
                limit: 10,
                order: { latestUploadedChapter: 'desc' },
                includes: ["cover_art", "author", "artist", "tag"]
            }
        });
    
        return from(tempM).pipe(
            switchMap(async response => {
                
                const latestMangas = await Promise.all(
                    response.data.data.map((manga: any) => this.mapMangaData(manga))
                );
    
                
                const mangaObservables: Observable<void>[] = latestMangas.map((manga: Manga_Dex) =>
                    this.createManga_Db({
                        manga_id: manga.id,
                        title: manga.defaultTitle,
                        cover_url: manga.currentCover
                    })
                );
    
                
                await forkJoin(mangaObservables).toPromise();
    
                return latestMangas;
            })
        );
    }
    
    //alle mangas die eine deutsche übersetzung haben aus der firebase ziehen
    getGermanManga_Dex(): Observable<Manga_Dex[]> {
        return this.getManga_DbByIds().pipe(
            switchMap(mangaDbArray => {
                const mangaIds = mangaDbArray.map(manga => manga.manga_id);
                const mangaObservables: Observable<any>[] = mangaIds.map(mangaId =>
                    this.checkGermanTranslationAvailable(mangaId, 'de').pipe(
                        switchMap(isGermanAvailable => {
                            if (isGermanAvailable) {
                                return this.getManga_DexById(mangaId);
                            } else {
                                return of(null);
                            }
                        })
                    )
                );
                return forkJoin(mangaObservables).pipe(
                    map(results => {
                        // Filtern
                        return results.filter(result => result !== null) as Manga_Dex[];
                    })
                );
            })
        );
    }

    //alle mangas die eine englische übersetzung haben aus der firebase ziehen
    getEnglishManga_Dex(): Observable<Manga_Dex[]> {
        return this.getManga_DbByIds().pipe(
            switchMap(mangaDbArray => {
                const mangaIds = mangaDbArray.map(manga => manga.manga_id);
                const mangaObservables: Observable<any>[] = mangaIds.map(mangaId =>
                    this.checkGermanTranslationAvailable(mangaId, 'en').pipe(
                        switchMap(isGermanAvailable => {
                            if (isGermanAvailable) {
                                return this.getManga_DexById(mangaId);
                            } else {
                                return of(null);
                            }
                        })
                    )
                );
                return forkJoin(mangaObservables).pipe(
                    map(results => {
                        // Filtern
                        return results.filter(result => result !== null) as Manga_Dex[];
                    })
                );
            })
        );
    }
    //help functions

    //api daten zu mangadex daten (interface)
    private async mapMangaData(apiData: any): Promise<Manga_Dex> {
        if (!apiData.id) {
            throw new Error('Ungültige Manga-ID von der API erhalten.');
        }
        if (!apiData || !apiData.attributes || !apiData.relationships) {
            throw new Error('Unerwartetes API-Datenformat');
        }
    
        const attributes = apiData.attributes;
        const relationships = apiData.relationships;
    
        console.log('Attributes:', attributes);
        console.log('Relationships:', relationships);
    
        const coverFileName = relationships.find(
            (rel: any) => rel.type === 'cover_art'
        )?.attributes?.fileName;
        const coverUrl = coverFileName
            ? `https://uploads.mangadex.org/covers/${apiData.id}/${coverFileName}`
            : '';
        const availableTranslatedLanguages = attributes.availableTranslatedLanguages || [];
    
        const tempR = await axios({
            method: 'GET',
            url: `${this.BASE_URL}/statistics/manga`,
            params: {
                manga: Array.isArray(apiData.data) ? apiData.data.map((manga: { id: string }) => manga.id) : []
            },
            validateStatus: function (status) {
                return status === 400 || (status >= 200 && status < 300);
            }
        });
    
        console.log('Statistics Response:', tempR.data);
    
        const statistics = tempR?.data?.statistics?.[apiData.id] || {};
        return {
            id: apiData.id,
            defaultTitle: attributes.title.en || '',
            germanTitle: attributes.title.de ? [attributes.title.de] : [],
            originalTitle: attributes.title.jp ? [attributes.title.jp] : [],
            currentCover: coverUrl,
            description: attributes.description.en || '',
            contentRating: attributes.contentRating || '',
            tags: attributes.tags.map((tag: any) => tag.attributes.name.en || ''),
            ratingAverage: statistics.rating?.average || 0,
            releaseDate: attributes.year || '',
            authors: relationships
                .filter((rel: any) => rel.type === 'author')
                .map((author: any) => author.attributes.name),
            artists: relationships
                .filter((rel: any) => rel.type === 'artist')
                .map((artist: any) => artist.attributes.name),
            publicationStatus: attributes.status || '',
            followers: statistics.followers || 0,
            commentCount: statistics.comments?.repliesCount || 0,
            demographic: attributes.publicationDemographic || '',
            originalLanguage: attributes.originalLanguage || '',
            lastVolume: parseInt(attributes.lastVolume, 10) || 0,
            lastChapter: parseInt(attributes.lastChapter, 10) || 0,
            ratingBayesian: statistics.rating?.bayesian || 0,
            availableTranslatedLanguages: availableTranslatedLanguages,
        };
    }
    
    //verfügbare Sprache prüfen
    private checkGermanTranslationAvailable(mangaId: string, language: string): Observable<boolean> {
        return this.getManga_DexById(mangaId).pipe(
            map((manga: Manga_Dex) => {

                return manga.availableTranslatedLanguages.includes(language);
            })
        );
    }


}



export interface Manga_DB {
    manga_id: string;
    title: string;
    cover_url: string;
};
export interface Manga_Dex {
    id: string;
    defaultTitle: string;
    germanTitle: string[];
    originalTitle: string[];
    currentCover: string;
    description: string;
    contentRating: string;
    tags: string[];
    ratingAverage: number;
    releaseDate: string;
    authors: string[];
    artists: string[];
    publicationStatus: string;
    followers: number;
    commentCount: number;
    demographic: string;
    originalLanguage: string;
    lastVolume: number;
    lastChapter: number;
    ratingBayesian: number;
    availableTranslatedLanguages: string[];
};
