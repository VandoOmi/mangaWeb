import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc,collection,query,where, getDocs,deleteDoc} from "firebase/firestore";
import { firebaseConfig } from "../../src/app/app.config";

interface Manga_DB {
    manga_id: string;
    title_de: string;
    cover_url: string;
};

class Manga_Dex {
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export const createManga = async (manga_id: string, title_de: string, cover_url: string): Promise<void> => {
    try {
        const mangaReference = doc(db, "manga-data", manga_id);
        const mangaDocument = await getDoc(mangaReference);
        if (mangaDocument.exists()) {
            console.error("Dokument existiert bereits");
            return;
        }
        const manga: Manga = { manga_id, title_de, cover_url }
        await setDoc(mangaReference, manga); 
        console.log("Dokument erstellt")
    } catch (error) {
        console.log("Fehler beim dokument erstellen: ", error);
    }
}
export const getMangaById = async (manga_id: string): Promise<Manga | null> => {
    try {
        const mangaDatabase = collection(db, "manga-data");
        const queryTitle = query(mangaDatabase, where("manga_id", "==", manga_id));
        const queryPreview = await getDocs(queryTitle);
        if (!queryPreview.empty) {
            const mangaDocument = queryPreview.docs[0];
            return mangaDocument.data() as Manga;
        } else {
            console.log("Kein Manga mit diesem Titel gefunden");
            return null;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mangas: ", error);
        return null;
    }
};
export const getMangaByTitle = async (title_de: string): Promise<Manga | null> => {
    try {
        const mangaDatabase = collection(db, "manga-data");
        const queryTitle = query(mangaDatabase, where("title_de", "==", title_de));
        const queryPreview = await getDocs(queryTitle);
        if (!queryPreview.empty) {
            const mangaDocument = queryPreview.docs[0];
            return mangaDocument.data() as Manga;
        } else {
            console.log("Kein Manga mit diesem Titel gefunden");
            return null;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mangas: ", error);
        return null;
    }
};
export const getAllMangas = async (): Promise<Manga[]> => {
    try {
        const mangaDatabase = collection(db, "manga-data");
        const queryPreview = await getDocs(mangaDatabase);
        const mangas: Manga[] = queryPreview.docs.map(doc => doc.data() as Manga);
        return mangas;
    } catch (error) {
        console.error("Fehler beim Abrufen der Mangas: ", error);
        return [];
    }
};
export const updateManga = async (manga: Manga): Promise<void> => {
    try {
        const mangaRef = doc(db, "manga-data", manga.manga_id);
        await setDoc(mangaRef, manga, { merge: true }); 
        console.log("Manga erfolgreich aktualisiert");
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Mangas: ", error);
    }
};
export const deleteManga = async (manga_id: string): Promise<void> => {
    try {
        const mangaRef = doc(db, "manga-data", manga_id);
        await deleteDoc(mangaRef);
        console.log("Manga erfolgreich gelöscht");
    } catch (error) {
        console.error("Fehler beim Löschen des Mangas: ", error);
    }
};