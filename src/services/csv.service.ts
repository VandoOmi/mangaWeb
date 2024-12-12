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

  public async init(path: string) 
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

  public async update(content: string): Promise<void> {
    try {
      const response = await fetch(this.csvPath.toString(), {
        method: 'PUT', // oder 'POST', je nach API-Anforderung
        headers: {
          'Content-Type': 'text/csv', // oder 'application/json', je nach Format
        },
        body: content,
      });

      if (!response.ok) {
        throw new Error(`Fehler beim Aktualisieren der Datei: ${response.statusText}`);
      }

      // Erfolgreiches Update
      this.content = content; // Aktualisiere den Inhalt im Service
      console.log('Datei erfolgreich aktualisiert.');
    } catch (error) {
      console.error('Fehler beim Aktualisieren der CSV-Datei:', error);
    }
  }
}
