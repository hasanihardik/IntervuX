import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="https://github.com" className="text-muted-foreground hover:text-primary">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IntervuX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

