import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';


@Injectable({
  providedIn: 'root'
})
export class MangaService {

    private mangaCsv = '/datenbank/mangas.json';
    private mangaList: Array<Manga> = [];
    
    private async readMangaList(contents?: string) {
        let content = contents || "";
        content.split("\n")
            .filter(e => e!=undefined)
            .forEach(e  => {
                const line = e.trim().split(";");
                const manga = new Manga(
                    line[0],
                    line[1],
                    line[2].split(","),
                    line[3].split(","),
                    line[4],
                    line[5],
                    line[6],
                    line[7].split(","),
                    Number(line[8]),
                    line[9],
                    line[10].split(","),
                    line[11].split(","),
                    line[12],
                    Number(line[13]),
                    Number(line[14]),
                    line[15],
                    line[16],
                    Number(line[17]),
                    Number(line[18]),
                    Number(line[20])
                );
                this.mangaList.push(manga)
            });
    }

    private async writeFile() {
        //soon™️
    }

    constructor() {}

    /**
     * Initialistion
     */
    public async init(): Promise<void> {
        console.log('Starte MangaService initialisierung');
        let csvServ = new CsvService();
        await csvServ.init(this.mangaCsv);
        await this.readMangaList(csvServ.getContent());
        console.log('MangaService wurde initialisiert');
    }

    /**
     * Get the mangalist
     * @returns An array with all mangas
     */
    public get mangalist() : Array<Manga> {
        return this.mangaList;
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
    public async writeManga(manga:Manga) {
        this.mangaList.push(manga);
        this.writeFile();
        this.readMangaList();
    }

    /**
     * Add mangas to the database
     * @param mangas An arraylist of mangas to add
     */
    public async writeMangas(mangas:Manga[]) {
        for (const manga of mangas) {
            this.mangalist.push(manga);
        }
        this.writeFile();
        this.readMangaList();
    }

    /**
     * Update an existing manga (CANNOT CHANGE ID)
     * @param manga The updated manga
     * @throws When manga is not found
     */
    public async updateManga(manga:Manga) {
        this.mangaList = this.mangaList.filter(mangaI => mangaI.id === manga.id);
        this.mangaList.push(manga);
        this.writeFile();
        this.readMangaList();
    }
    /**
     * Update multiple mangas (CANNOT CHANGE ID)
     * @param mangas The updated mangas
     * @throws When mangas are not found
     */
    public async updateMangas(mangas:Manga[]) {
        for (const manga of mangas) {
            this.mangaList = this.mangaList.filter(mangaI => mangaI.id === manga.id);
            this.mangaList.push(manga);
        }
        this.writeFile();
        this.readMangaList();
    }

    /**
     * Delete a manga
     * @param id The id of manga you want to delete
     * @throws When manga is not found
     */
    public async deleteManga(id:string) {
        this.mangaList = this.mangaList.filter(mangaI => mangaI.id === id)
        this.writeFile();
        this.readMangaList();
    }

    /**
     * Delete multiple mangas
     * @param ids Array list of id's you want to delete
     * @throws When a manga is not found and cancles the entire process
     */
    public async deleteMangas(ids:string[]) {
        for (const id of ids) {
            this.mangaList = this.mangaList.filter(mangaI => mangaI.id === id);
        }
        this.writeFile();
        this.readMangaList();
    }
}

export class Manga {
  private _id: string; //0 .
  private _defaultTitle: string; //1 .
  private _germanTitle: string[]; //2
  private _originalTitle: string[]; //3
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
  private _ratingBayesian: number; //20

  constructor(
    id: string, //0 .
    defaultTitle: string, //1 .
    germanTitle: string[], //2
    originalTitle: string[], //3
    currentCover: string, //4 .
    description: string, //5 .
    contentRating: string, //6
    tags: string[], //7
    ratingAverage: number, //8 .
    releaseDate: string, //9
    authors: string[], //10
    artists: string[], //11
    publicationStatus: string, //12
    followers: number, //13
    commentCount: number, //14
    demographic: string, //15
    originalLanguage: string, //16 .
    lastVolume: number, //17
    lastChapter: number, //18
    ratingBayesian: number //20
  ) {
    this._id = id;
    this._defaultTitle = defaultTitle;
    this._germanTitle = germanTitle || [];
    this._originalTitle = originalTitle || [];
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

  get originalTitle(): string[] {
      return this._originalTitle;
  }

  set originalTitle(value: string[]) {
      this._originalTitle = value;
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

  get ratingBayesian(): number {
      return this._ratingBayesian;
  }

  set ratingBayesian(value: number) {
      this._ratingBayesian = value;
  }

  /**
   * This class to json
   * @returns The class in a json object
   */
  public toJson(): object {
    let content = {
        "defaultTitle": this._id,
        "germanTitle": this._germanTitle,
        "originalTitle": this._originalTitle,
        "cover": this._currentCover,
        "description": this._description,
        "contentRating": this._contentRating,
        "tags": this._tags,
        "releaseYear": this._releaseDate,
        "authors": this._authors,
        "artists": this._artists,
        "publicationStatus": this._publicationStatus,
        "demographic": this._demographic,
        "originalLanguage": this._originalLanguage,
        "lastVolume": this._lastVolume,
        "lastChapter": this._lastChapter
    }

    let rating = {
        "comments": this._commentCount,
        "follows": this._followers,
        "rating": {
            "average": this._ratingAverage,
            "bayesian": this._ratingBayesian
        }
    }
    return {[this._id]: {"manga": content, "rating": rating}};
  }
}