import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';


@Injectable({
  providedIn: 'root'
})
export class MangaService {

  static mangaCsv = '../public/datenbank/manga.csv';
  content: string;

  constructor(csvServ: CsvService)
  { 
    csvServ.init(MangaService.mangaCsv);
    this.content = csvServ.getContent();
  }

  /**
   * Get all manga
   * @returns An array with all mangas in the database
   */
  async readMangaList(): Promise<Array<Manga>> {
    const lines = this.content.split("\n");
    let mangaList: Array<Manga> = new Array<Manga>;

    lines.forEach(e => {
      const line = e.trim().split(",");
      if(line.length === 12) {
      mangaList.push(new Manga(line[0],stringToArray(line[1]),stringToArray(line[2]),stringToArray(line[3]),stringToArray(line[4]),stringToArray(line[5]),line[6].replace("/n", "\n"),stringToArray(line[7]),Number(line[8]),Number(line[9]),Number(line[10]),stringToArray(line[11])))
      }
    });

    return mangaList;
  }

  /**
   * Get a specified manga
   * @param id The id of a specific manga you need
   * @returns Manga
   * @throws When the manga id you gave doesnt exist
   */
  async readMangaId(id:string): Promise<Manga> { 
    const lines = this.content.split("\n");

    lines.forEach(e => {
      const line = e.trim().split(";");
      if (line[0] === id) {
        return new Manga(line[0],stringToArray(line[1]),stringToArray(line[2]),stringToArray(line[3]),stringToArray(line[4]),stringToArray(line[5]),line[6],stringToArray(line[7]),Number(line[8]),Number(line[9]),Number(line[10]),stringToArray(line[11]))
      }
    });
    throw new Error("Manga not found!");
  }

  /**
   * Add one manga to the database
   * @param manga The manga you want to add
   */
  async writeManga(manga:Manga) {
    this.content
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
  private _id: string;
  private _defaultTitle: string;
  private _englishTitle: string[];
  private _germanTitle: string[];
  private _originalTitle: string[];
  private _originalRomanjiTitle: string[];
  private _currentCover: string;
  private _description: string;
  private _contentRating: string;
  private _tags: string[];
  private _ratingAverage: number;
  private _releaseDate: string;
  private _authors: string[];
  private _artists: string[];
  private _publicationStatus: string;
  private _followers: number;
  private _commentCount: number;
  private _demographic: string;
  private _originalLanguage: string;
  private _lastVolume: number;
  private _lastChapter: number;
  private _allCovers: string[];
  private _ratingBayesian: number;

  constructor(
    id:string,
    defaultTitle:string,
    currentCover:string,
    description:string,
    ratingAverage:number,
    originalLanguage:string
  ) {
    this._id = id;
    this._defaultTitle = defaultTitle;
    this._englishTitle = [];
    this._germanTitle = [];
    this._originalTitle = [];
    this._originalRomanjiTitle = [];
    this._currentCover = currentCover	;
    this._description = description;
    this._contentRating = '';
    this._tags = [];
    this._ratingAverage = ratingAverage;
    this._releaseDate = '';
    this._authors = [];
    this._artists = [];
    this._publicationStatus = '';
    this._followers = 0;
    this._commentCount = 0;
    this._demographic = '';
    this._originalLanguage = originalLanguage;
    this._lastVolume = 0;
    this._lastChapter = 0;
    this._allCovers = [];
    this._ratingBayesian = 0;
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

  get englishTitle(): string[] {
      return this._englishTitle;
  }

  set englishTitle(value: string[]) {
      this._englishTitle = value;
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


function stringToArray(input: string): string[] {
  return input.split(',').map(item => item.trim());
}