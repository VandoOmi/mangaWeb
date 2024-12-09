import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';
import e from 'express';

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
      const line = e.trim().split(";");
      if(line.length === 12) {
      mangaList.push(new Manga(line[0],line[1],line[2],line[3],line[4],line[5],line[6],line[7],Number(line[8]),Number(line[9]),Number(line[10]),line[11]))
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
        return new Manga(line[0],line[1],line[2],line[3],line[4],line[5],line[6],line[7],Number(line[8]),Number(line[9]),Number(line[10]),line[11])
      }
    });
    throw new Error("Manga not found!");
  }

  /**
   * Add one manga to the database
   * @param manga The manga you want to add
   */
  async writeManga(manga:Manga) {
    
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
  private isbn:string;
  private nameEn:string;
  private nameJr:string;
  private nameJa:string;
  private author:string;
  private artist:string;
  private desc:string;
  private tags:string
  private volume:number;
  private chapter:number;
  private rating:number;
  private cover:string;

  constructor (isbn:string, nameEn:string, nameJr:string, nameJa:string, author:string, artist:string, desc:string, tags:string, volume:number, chapter:number, rating:number, cover:string )
  {
    this.isbn = isbn;
    this.nameEn = nameEn;
    this.nameJr = nameJr;
    this.nameJa = nameJa;
    this.author = author;
    this.artist = artist;
    this.desc = desc;
    this.tags = tags;
    this.volume = volume;
    this.chapter = chapter;
    this.rating = rating;
    this.cover = cover;
  }
}