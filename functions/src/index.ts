import { initializeApp } from "firebase/app"; //mich fucked es ab das ich hier nen Fehler habe (Miguel)
import { getFirestore, doc, setDoc, getDoc,collection,query,where, getDocs,deleteDoc} from "firebase/firestore"; //mich fucked es ab das ich hier nen Fehler habe (Miguel)
import { firebaseConfig } from "../../src/app/app.config";
import { Manga_DB } from "../../src/services/manga.service";
import { Observable } from "rxjs";

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
        const manga: Manga_DB = { manga_id, title_de, cover_url }
        await setDoc(mangaReference, manga); 
        console.log("Dokument erstellt")
    } catch (error) {
        console.log("Fehler beim dokument erstellen: ", error);
    }
}
export const getMangaById = async (manga_id: string): Observable<Manga_DB> => {
    try {
        const mangaDatabase = collection(db, "manga-data");
        const queryTitle = query(mangaDatabase, where("manga_id", "==", manga_id));
        const queryPreview = await getDocs(queryTitle);
        if (!queryPreview.empty) {
            const mangaDocument = queryPreview.docs[0];
            return from(mangaDocument.data() as Manga_DB);
        } else {
            console.log("Kein Manga_DB mit diesem Titel gefunden");
            return null;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mangas: ", error);
        return null;
    }
};
export const getMangaByTitle = async (title_de: string): Promise<Manga_DB | null> => {
    try {
        const mangaDatabase = collection(db, "manga-data");
        const queryTitle = query(mangaDatabase, where("title_de", "==", title_de));
        const queryPreview = await getDocs(queryTitle);
        if (!queryPreview.empty) {
            const mangaDocument = queryPreview.docs[0];
            return mangaDocument.data() as Manga_DB;
        } else {
            console.log("Kein Manga_DB mit diesem Titel gefunden");
            return null;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mangas: ", error);
        return null;
    }
};
export const getAllMangas = async (): Promise<Manga_DB[]> => {
    try {
        const mangaDatabase = collection(db, "manga-data");
        const queryPreview = await getDocs(mangaDatabase);
        const mangas: Manga_DB[] = queryPreview.docs.map((doc => doc.data() as Manga_DB)); //mich fucked es ab das ich hier nen Fehler habe (Miguel)
        return mangas;
    } catch (error) {
        console.error("Fehler beim Abrufen der Mangas: ", error);
        return [];
    }
};
export const updateManga = async (manga: Manga_DB): Promise<void> => {
    try {
        const mangaRef = doc(db, "manga-data", manga.manga_id);
        await setDoc(mangaRef, manga, { merge: true }); 
        console.log("Manga_DB erfolgreich aktualisiert");
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Mangas: ", error);
    }
};
export const deleteManga = async (manga_id: string): Promise<void> => {
    try {
        const mangaRef = doc(db, "manga-data", manga_id);
        await deleteDoc(mangaRef);
        console.log("Manga_DB erfolgreich gelöscht");
    } catch (error) {
        console.error("Fehler beim Löschen des Mangas: ", error);
    }
};