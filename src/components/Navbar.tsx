import { Button } from "@/components/ui/button";
import {
    Search,
    Bell,
    User,
    Home,
    Compass,
    Bookmark,
    TrendingUp,
    Menu
} from "lucide-react";

export function Navbar() {
    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Left side - Navigation links */}
                    <div className="hidden md:flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-violet-600">
                            <Home className="w-4 h-4 mr-1.5" />
                            Home
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-violet-600">
                            <Compass className="w-4 h-4 mr-1.5" />
                            Explore
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-violet-600">
                            <TrendingUp className="w-4 h-4 mr-1.5" />
                            Trending
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-violet-600">
                            <Bookmark className="w-4 h-4 mr-1.5" />
                            Saved
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>

                    {/* Center - Search bar */}
                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                className="w-full h-9 pl-10 pr-4 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                            />
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-violet-600">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </Button>
                        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-md">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-sm font-medium text-slate-700">Guest User</p>
                                <p className="text-xs text-slate-400">Free Plan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
