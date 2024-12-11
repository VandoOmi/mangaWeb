import { Injectable } from '@angular/core';

@Injectable
({
  providedIn: 'root'
})
export class CsvService
{

  private csvPath!: URL;
  private content: string = '';

  constructor() { }

  getContent(): string 
  {
    return this.content;
  }

  async init(path: string) 
  {
    this.csvPath = new URL(path);
    this.content =  await this.load();
  }

  private async load(): Promise<string>
  {
    try
    {
      const response = await fetch(this.csvPath);
      if(!response.ok)
      {
        throw new Error(`Fehler beim Laden der Datei: ${response.statusText}`)
      }
      return await response.text();
    }
    catch(error) 
    {
      console.error("Fehler beim Laden der CSV-Datei:", error);
      return '';
    }
  } 
}
