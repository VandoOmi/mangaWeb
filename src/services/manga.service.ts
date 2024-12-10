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
  private _isbn:string;
  private _nameEn:string[];
  private _nameJr:string[];
  private _nameJa:string[];
  private _author:string[];
  private _artist:string[];
  private _desc:string;
  private _tags:string[];
  private _volume:number;
  private _chapter:number;
  private _rating:number;
  private _cover:string[];

  constructor (
    _isbn:string,
    _nameEn:string[],
    _nameJr:string[],
    _nameJa:string[],
    _author:string[],
    _artist:string[],
    _desc:string,
    _tags:string[],
    _volume:number,
    _chapter:number,
    _rating:number,
    _cover:string[]
  )

  {
    this._isbn = _isbn;
    this._nameEn = _nameEn;
    this._nameJr = _nameJr;
    this._nameJa = _nameJa;
    this._author = _author;
    this._artist = _artist;
    this._desc = _desc;
    this._tags = _tags;
    this._volume = _volume;
    this._chapter = _chapter;
    this._rating = _rating;
    this._cover = _cover;
  }

  
  public get isbn() : string {
    return this._isbn;
  }

  
  public get nameEn() : string[] {
    return this._nameEn;
  }

  
  public get nameJr() : string[] {
    return this._nameJr;
  }
  
  public get nameJa() : string[] {
    return this._nameJa;
  }
  
  public get author() : string[] {
    return this._author;
  }
  
  public get artist() : string[] {
    return this._artist;
  }
  
  public get desc() : string {
    return this._desc;
  }
  
  public get tags() : string[] {
    return this._tags;
  }
  
  public get volume() : number {
    return this._volume;
  }
  
  public get chapter() : number {
    return this._chapter;
  }
  
  public get rating() : number {
    return this._rating;
  }
  
  public get cover() : string[] {
    return this._cover;
  }
  
  public set isbn(v : string) {
    this._isbn = v;
  }
  
  public set nameEn(v : string[]) {
    this._nameEn = v;
  }
  
  public set nameJr(v : string[]) {
    this._nameJr = v;
  }
  
  public set nameJa(v : string[]) {
    this._nameJa = v;
  }
  
  public set author(v : string[]) {
    this._author = v;
  }
  
  public set artist(v : string[]) {
    this._artist = v;
  }
  
  public set desc(v : string) {
    this._desc = v;
  }
  
  public set tags(v : string[]) {
    this._tags = v;
  }
  
  public set volume(v : number) {
    this._volume = v;
  }
  
  public set chapter(v : number) {
    this._chapter = v;
  }
  
  public set rating(v : number) {
    this._rating = v;
  }
  
  public set cover(v : string[]) {
    this._cover = v;
  }
}

function stringToArray(input: string): string[] {
  return input.split(',').map(item => item.trim());
}