import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { AddNoteForm } from "@/components/add-note-form"

// Mock data to use when Supabase is not available
const mockNotes = [
  { id: 1, title: "Today I created a Supabase project." },
  { id: 2, title: "I added some data and queried it from Next.js." },
  { id: 3, title: "It was awesome!" },
]

export default async function Notes() {
  // Use mock data instead of trying to fetch from Supabase
  const notes = mockNotes

  async function deleteNote(formData: FormData) {
    "use server"
    // In a real app, this would delete from Supabase
    console.log("Delete note:", formData.get("id"))
    // No revalidation needed for mock data
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>

      <div className="mb-8">
        <AddNoteForm />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <Card key={note.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="line-clamp-2">{note.title}</CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <form action={deleteNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <Button variant="outline" size="sm" type="submit">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No notes found. Create your first note above.
          </div>
        )}
      </div>
    </div>
  )
}
