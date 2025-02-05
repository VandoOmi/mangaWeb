import { Injectable, inject } from '@angular/core';
import { Observable, from, map, forkJoin, of } from 'rxjs';
import { Firestore, doc, getDoc, collection, setDoc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import axios from 'axios'; //muss installiert werden npm install axios 
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { limit, orderBy } from 'firebase/firestore';
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
        const tempM = axios({
            method: 'get',
            url: `https://api.mangadex.org/manga/${mangaId}`,

            params: {
                includes: ["cover_art", "author", "artist", "tag"]
            }
        });

        return from(tempM).pipe(
            mergeMap(async response => await this.mapMangaData(response.data.data))
        );
    }

    // ein array aus mangaids gibt alle mangas mit den ids zurück
    getManga_DexByIds(ids: string[]): Observable<Manga_Dex[]> {
        const tempArray = ids.map(id => this.getManga_DexById(id));
        return forkJoin(tempArray);
    }

    // laden der mangadex api daten zu allen gespeicherten ids in firestore
    getAllManga_Dex(count: number): Observable<Manga_Dex[]> {
    return this.getAllManga_DBIds().pipe(
        switchMap(ids => this.getManga_DexByIds(ids))
    );

    }


    // Laden der 10 bestbewerteten Mangas in Mangadex und auch speichern dieser
    getTopRatedManga_Dex(count: number): Observable<Manga_Dex[]> {
        const tempM = axios({
            method: 'get',
            url: 'https://api.mangadex.org/manga',
            params: {
                limit: count,
                order: { rating: 'desc' },
                includes: ["cover_art", "author", "artist", "tag"]
            }
        });

        return from(tempM).pipe(
            mergeMap(response =>
                from(
                    Promise.all(
                        response.data.data.map((manga: any) => this.mapMangaData(manga))
                    )
                )
            ),
            tap(latestMangas => {
                latestMangas.forEach((manga: Manga_Dex) => {
                    this.createManga_Db({
                        manga_id: manga.id,
                        title: manga.defaultTitle,
                        cover_url: manga.currentCover
                    }).subscribe();
                });
            })
        );
    }

    // Laden der 10 zuletzt hochgeladenen Mangas in Mangadex und auch speichern dieser
    getLatestManga_Dex(count: number): Observable<Manga_Dex[]> {
        const tempM = axios({
            method: 'get',
            url: 'https://api.mangadex.org/manga',
            params: {
                limit: count,
                order: { latestUploadedChapter: 'desc' },
                includes: ["cover_art", "author", "artist", "tag"]
            }
        });

        return from(tempM).pipe(
            mergeMap(response =>
                from(
                    Promise.all(
                        response.data.data.map((manga: any) => this.mapMangaData(manga))
                    )
                )
            ),
            tap(latestMangas => {
                latestMangas.forEach((manga: Manga_Dex) => {
                    this.createManga_Db({
                        manga_id: manga.id,
                        title: manga.defaultTitle,
                        cover_url: manga.currentCover
                    }).subscribe();
                });
            })
        );
    }

    //alle mangas die eine deutsche übersetzung haben aus der firebase ziehen
    getGermanManga_Dex(count: number): Observable<Manga_Dex[]> {
        const tempM = axios({
            method: 'get',
            url: 'https://api.mangadex.org/manga',
            params: {
                limit: count,
                includes: ["cover_art", "author", "artist", "tag"]
            }

        });

        return from(tempM).pipe(
            mergeMap(response =>
                from(
                    Promise.all(
                        response.data.data.map((manga: any) => this.mapMangaData(manga))
                    )
                )
            ),
            tap(latestMangas => {
                latestMangas.forEach((manga: Manga_Dex) => {
                    const hasGermanTranslation = manga.availableTranslatedLanguages.some((translation: any) => translation.language === 'de');

                    if (hasGermanTranslation) {
                        this.createManga_Db({
                            manga_id: manga.id,
                            title: manga.defaultTitle,
                            cover_url: manga.currentCover
                        }).subscribe();
                    }
                });
            })
        );
    }

    //alle mangas die eine englische übersetzung haben aus der firebase ziehen
    getEnglishManga_Dex(count: number): Observable<Manga_Dex[]> {
        const tempM = axios({
            method: 'get',
            url: 'https://api.mangadex.org/manga',
            params: {
                limit: count,
                includes: ["cover_art", "author", "artist", "tag"]
            }

        });

        return from(tempM).pipe(
            mergeMap(response =>
                from(
                    Promise.all(
                        response.data.data.map((manga: any) => this.mapMangaData(manga))
                    )
                )
            ),
            tap(latestMangas => {
                latestMangas.forEach((manga: Manga_Dex) => {
                    const hasGermanTranslation = manga.availableTranslatedLanguages.some((translation: any) => translation.language === 'en');

                    if (hasGermanTranslation) {
                        this.createManga_Db({
                            manga_id: manga.id,
                            title: manga.defaultTitle,
                            cover_url: manga.currentCover
                        }).subscribe();
                    }
                });
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

        const coverFileName = relationships.find(
            (rel: any) => rel.type === 'cover_art'
        )?.attributes?.fileName;
        const coverUrl = coverFileName ? `https://uploads.mangadex.org/covers/${apiData.id}/${coverFileName}` : '';

        const tempR = await axios({
            method: 'GET',
            url: `${this.BASE_URL}/statistics/manga/${apiData.id}`
        });

        let originalTitle = [];
        let germanTitle = [];

        for (let j = 0; j < attributes.altTitles.length; j++) {
            const altTitles = attributes.altTitles[j];
            if (altTitles.hasOwnProperty(attributes.originalLanguage)) {
                originalTitle.push(altTitles[attributes.originalLanguage])
            }
            if (altTitles.hasOwnProperty('de')) {
                germanTitle.push(altTitles.de)
            }
            if (altTitles.hasOwnProperty(`${attributes.originalLanguage}-ro`)) {
                originalTitle.push(altTitles[`${attributes.originalLanguage}-ro`])
            }
        }

        const statistics = tempR?.data?.statistics?.[apiData.id] || {};
        const manga = {
            id: apiData.id,
            defaultTitle: attributes.title.en || '',
            germanTitle: germanTitle,
            originalTitle: originalTitle,
            currentCover: coverUrl,
            description: attributes.description.en || '',
            contentRating: attributes.contentRating || '',
            tags: attributes.tags.map((tag: any) => tag.attributes.name.en || ''),
            ratingAverage: statistics.rating?.average || 0,
            releaseDate: attributes.year || '',
            authors: relationships
                .filter((rel: any) => rel.type === 'author')
                .map((author: any) => author.attributes?.name ?? ''),
            artists: relationships
                .filter((rel: any) => rel.type === 'artist')
                .map((artist: any) => artist.attributes?.name ?? ''),
            publicationStatus: attributes.status || '',
            followers: statistics.follows || 0,
            commentCount: statistics.comments?.repliesCount || 0,
            demographic: attributes.publicationDemographic || '',
            originalLanguage: attributes.originalLanguage || '',
            lastVolume: parseInt(attributes.lastVolume, 10) || 0,
            lastChapter: parseInt(attributes.lastChapter, 10) || 0,
            ratingBayesian: statistics.rating?.bayesian || 0,
            availableTranslatedLanguages: attributes.availableTranslatedLanguages || [],
        };

        return manga;
    }
    //alle ids aus der firebase ziehen
    getAllManga_DBIds() {
        const mangaDatabase = collection(this.db, "manga-data");
        const promise = getDocs(mangaDatabase);

        return from(promise).pipe(
            mergeMap(snapshot => {
                const ids: string[] = snapshot.docs.map(doc => doc.id);
                return [ids];
            })
        );
    }


}


// interface für Firebase 
export interface Manga_DB {
    manga_id: string;
    title: string;
    cover_url: string;
};
// interface für Mangadex api
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
