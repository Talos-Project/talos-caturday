import { Plugin } from "./interfaces/Plugin";
import { GitClient } from "./interfaces/GitClient";
import { NoteEvent } from "./interfaces/events/NoteEvent";
import { Config } from "./interfaces/Config";
import { GitProvider } from "./GitProvider";

export default class Caturday implements Plugin<any, Promise<any>> {
  private client: GitClient;

  constructor(config: Config) {
    this.client = GitProvider.getInstance(config.git);
  }

  async handle(rx: NoteEvent): Promise<any> {
    if (rx.object_kind !== "note") return Promise.resolve();

    if (
      rx.object_attributes.note &&
      rx.object_attributes.note.includes("/meow")
    )
      return this.client.MergeRequestNotes.create(
        rx.project_id,
        rx.merge_request.iid,
        "![cat](https://cataas.com/cat)"
      );
  }
}
