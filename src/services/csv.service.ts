import { Injectable } from '@angular/core';

@Injectable
({
  providedIn: 'root'
})

export class CsvService
{
  private csvPath: string = '';
  private content: string = '';

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

  constructor() { }

  /**
   * 
   * @param path 
   */
  public async init(path: string) 
  {
    this.csvPath = path
    this.content =  await this.load();
  }

  /**
   * updates the content in the csv-file
   * @param content
   */
  public async update(content: string): Promise<void> {
    try {
      const response = await fetch(this.csvPath, {
        method: 'PUT',
        headers: {
          'Content-Type': 'text/csv',
        },
        body: content,
      });

      if (!response.ok) {
        throw new Error(`Fehler beim Aktualisieren der Datei: ${response.statusText}`);
      }

      this.content = content;
      console.log('Datei erfolgreich aktualisiert.');
    } catch (error) {
      console.error('Fehler beim Aktualisieren der CSV-Datei:', error);
    }
  }

  public getContent(): string 
  {
    return this.content;
  }
}
