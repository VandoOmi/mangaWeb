import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';


@Injectable({
  providedIn: 'root'
})
export class MangaService {

    private mangaCsv = 'public/datenbank/manga.csv';
    private mangaList: Array<Manga> = [];

    constructor()
    { 
        this.init()
    }

    /**
     * Initialistion
     */
    public async init(): Promise<void> {
        let csvServ = new CsvService();
        csvServ.init(this.mangaCsv);
        this.mangaList = await this.readMangaList(csvServ.getContent());
        console.log('MangaService wurde initialisiert');
    }

    
    public get mangalist() : Array<Manga> {
        return this.mangaList;
    }
    
    /**
     * Get all manga
     * @returns An array with all mangas in the database
     */
    private async readMangaList(content: string): Promise<Array<Manga>> {
        const lines = content.split("\n");
        let mangaList: Array<Manga> = new Array<Manga>;

        lines.forEach(e => {
            const line = e.trim().split(",");
            const manga = new Manga(line[0],line[1],line[4],line[5],Number(line[8]),line[16]);
            manga.germanTitle = line[2].replace(`"`, ``).split(",");
            manga.originalRomanjiTitle = line[3].replace(`"`, ``).split(",");
            manga.contentRating = line[6];
            manga.tags = line[7].replace(`"`, ``).split(",");
            manga.ratingAverage = Number(line[8]);
            manga.releaseDate = line[9];
            manga.authors = line[10].replace(`"`, ``).split(",");
            manga.artists = line[11].replace(`"`, ``).split(",");
            manga.publicationStatus = line[12];
            manga.followers = Number(line[13]);
            manga.commentCount = Number(line[14]);
            manga.demographic = line[15];
            manga.lastVolume = Number(line[17]);
            manga.lastChapter = Number(line[18]);
            manga.allCovers = line[19].replace(`"`, ``).split(",");
            manga.ratingBayesian = Number(line[20]);
            mangaList.push(manga)
        });

        return await mangaList;
    }

    /**
     * Get a specified manga
     * @param id The id of a specific manga you need
     * @returns Manga
     * @throws When the manga id you gave doesnt exist
     */
    public async readMangaId(id:string): Promise<Manga> { 
    for (const manga of this.mangaList) {
        if (manga.id === id) {
            return manga;
        }
    }
    throw new Error("Manga not found!");
    }

    /**
     * Add one manga to the database
     * @param manga The manga you want to add
     */
    async writeManga(manga:Manga) {
        // idk irgendwas halt
    }

    /**
     * Add mangas to the database
     * @param manga An arraylist of mangas to add
     */
    async writeMangas(manga:Manga[]) {
    //soon™️
    }

    /**
     * Update an existing manga (CANNOT CHANGE ID)
     * @param manga The updated manga
     * @throws When manga is not found
     */
    async updateManga(manga:Manga) {
    //soon™️
    }
    /**
     * Update multiple mangas (CANNOT CHANGE ID)
     * @param manga The updated mangas
     * @throws When mangas are not found
     */
    async updateMangas(manga:Manga[]) {
    //soon™️
    }

    /**
     * Delete a manga
     * @param id The id of manga you want to delete
     * @throws When manga is not found
     */
    async deleteManga(id:string) {
    //soon™️
    }

    /**
     * Delete multiple mangas
     * @param id Array list of id's you want to delete
     * @throws When a manga is not found and cancles the entire process
     */
    async deleteMangas(id:string[]) {
    //soon™️
    }
}

export class Manga {
  private _id: string; //0 .
  private _defaultTitle: string; //1 .
  private _germanTitle: string[]; //2
  private _originalRomanjiTitle: string[]; //3
  private _currentCover: string; //4 .
  private _description: string; //5 .
  private _contentRating: string; //6
  private _tags: string[]; //7
  private _ratingAverage: number; //8 .
  private _releaseDate: string; //9
  private _authors: string[]; //10
  private _artists: string[]; //11
  private _publicationStatus: string; //12
  private _followers: number; //13
  private _commentCount: number; //14
  private _demographic: string; //15
  private _originalLanguage: string; //16 .
  private _lastVolume: number; //17
  private _lastChapter: number; //18
  private _allCovers: string[]; //19
  private _ratingBayesian: number; //20

  constructor(
    id: string, //0 .
    defaultTitle: string, //1 .
    currentCover: string, //4 .
    description: string, //5 .
    ratingAverage: number, //8 .
    originalLanguage: string, //16 .
    germanTitle?: string[], //2
    originalRomanjiTitle?: string[], //3
    contentRating?: string, //6
    tags?: string[], //7
    releaseDate?: string, //9
    authors?: string[], //10
    artists?: string[], //11
    publicationStatus?: string, //12
    followers?: number, //13
    commentCount?: number, //14
    demographic?: string, //15
    lastVolume?: number, //17
    lastChapter?: number, //18
    allCovers?: string[], //19
    ratingBayesian?: number //20
  ) {
    this._id = id;
    this._defaultTitle = defaultTitle;
    this._germanTitle = germanTitle || [];
    this._originalRomanjiTitle = originalRomanjiTitle || [];
    this._currentCover = currentCover;
    this._description = description;
    this._contentRating = contentRating || "";
    this._tags = tags || [];
    this._ratingAverage = ratingAverage;
    this._releaseDate = releaseDate || "";
    this._authors = authors || [];
    this._artists = artists ||[];
    this._publicationStatus = publicationStatus || "";
    this._followers = followers || 0;
    this._commentCount = commentCount || 0;
    this._demographic = demographic || "";
    this._originalLanguage = originalLanguage;
    this._lastVolume = lastVolume || 0;
    this._lastChapter = lastChapter || 0;
    this._allCovers = allCovers || [];
    this._ratingBayesian = ratingBayesian || 0;
  }

  get id(): string {
      return this._id;
  }

  set id(value: string) {
      this._id = value;
  }

  get defaultTitle(): string {
      return this._defaultTitle;
  }

  set defaultTitle(value: string) {
      this._defaultTitle = value;
  }

  get germanTitle(): string[] {
      return this._germanTitle;
  }

  set germanTitle(value: string[]) {
      this._germanTitle = value;
  }

  get originalRomanjiTitle(): string[] {
      return this._originalRomanjiTitle;
  }

  set originalRomanjiTitle(value: string[]) {
      this._originalRomanjiTitle = value;
  }

  get currentCover(): string {
      return this._currentCover;
  }

  set currentCover(value: string) {
      this._currentCover = value;
  }

  get description(): string {
      return this._description;
  }

  set description(value: string) {
      this._description = value;
  }

  get contentRating(): string {
      return this._contentRating;
  }

  set contentRating(value: string) {
      this._contentRating = value;
  }

  get tags(): string[] {
      return this._tags;
  }

  set tags(value: string[]) {
      this._tags = value;
  }

  get ratingAverage(): number {
      return this._ratingAverage;
  }

  set ratingAverage(value: number) {
      this._ratingAverage = value;
  }

  get releaseDate(): string {
      return this._releaseDate;
  }

  set releaseDate(value: string) {
      this._releaseDate = value;
  }

  get authors(): string[] {
      return this._authors;
  }

  set authors(value: string[]) {
      this._authors = value;
  }

  get artists(): string[] {
      return this._artists;
  }

  set artists(value: string[]) {
      this._artists = value;
  }

  get publicationStatus(): string {
      return this._publicationStatus;
  }

  set publicationStatus(value: string) {
      this._publicationStatus = value;
  }

  get followers(): number {
      return this._followers;
  }

  set followers(value: number) {
      this._followers = value;
  }

  get commentCount(): number {
      return this._commentCount;
  }

  set commentCount(value: number) {
      this._commentCount = value;
  }

  get demographic(): string {
      return this._demographic;
  }

  set demographic(value: string) {
      this._demographic = value;
  }

  get originalLanguage(): string {
      return this._originalLanguage;
  }

  set originalLanguage(value: string) {
      this._originalLanguage = value;
  }

  get lastVolume(): number {
      return this._lastVolume;
  }

  set lastVolume(value: number) {
      this._lastVolume = value;
  }

  get lastChapter(): number {
      return this._lastChapter;
  }

  set lastChapter(value: number) {
      this._lastChapter = value;
  }

  get allCovers(): string[] {
      return this._allCovers;
  }

  set allCovers(value: string[]) {
      this._allCovers = value;
  }

  get ratingBayesian(): number {
      return this._ratingBayesian;
  }

  set ratingBayesian(value: number) {
      this._ratingBayesian = value;
  }
}