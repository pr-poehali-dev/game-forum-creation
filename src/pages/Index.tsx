import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  posts: number;
  reputation: number;
}

interface Topic {
  id: string;
  title: string;
  author: User;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned?: boolean;
  isHot?: boolean;
}

const ForumPage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const mockUser: User = {
    id: '1',
    username: 'ProGamer2024',
    avatar: '',
    level: 42,
    posts: 1337,
    reputation: 9999
  };

  const mockTopics: Topic[] = [
    {
      id: '1',
      title: 'Новые правила форума - обязательно к прочтению!',
      author: { id: '2', username: 'Admin', avatar: '', level: 100, posts: 5000, reputation: 50000 },
      category: 'Правила',
      replies: 234,
      views: 12500,
      lastActivity: '5 мин назад',
      isPinned: true
    },
    {
      id: '2',
      title: 'Обсуждение патча 2.5 - новые механики',
      author: { id: '3', username: 'PlayerOne', avatar: '', level: 35, posts: 890, reputation: 4500 },
      category: 'Обсуждения',
      replies: 567,
      views: 8900,
      lastActivity: '15 мин назад',
      isHot: true
    },
    {
      id: '3',
      title: 'Анкета на должность модератора',
      author: { id: '4', username: 'ModTeam', avatar: '', level: 80, posts: 3200, reputation: 25000 },
      category: 'Анкеты',
      replies: 45,
      views: 2300,
      lastActivity: '1 час назад'
    },
    {
      id: '4',
      title: 'Отчёт о рейде на босса Кракена',
      author: { id: '5', username: 'RaidLeader', avatar: '', level: 50, posts: 1200, reputation: 8000 },
      category: 'Отчёты',
      replies: 89,
      views: 5600,
      lastActivity: '2 часа назад'
    },
    {
      id: '5',
      title: 'Лучшие билды для новичков',
      author: { id: '6', username: 'GameGuru', avatar: '', level: 60, posts: 2100, reputation: 15000 },
      category: 'Обсуждения',
      replies: 234,
      views: 15000,
      lastActivity: '30 мин назад',
      isHot: true
    }
  ];

  const handleLogin = () => {
    setCurrentUser(mockUser);
    setIsLoginOpen(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Правила': 'bg-red-500/20 text-red-400 border-red-500/50',
      'Обсуждения': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'Анкеты': 'bg-green-500/20 text-green-400 border-green-500/50',
      'Отчёты': 'bg-purple-500/20 text-purple-400 border-purple-500/50'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  const renderTopics = (topics: Topic[]) => (
    <div className="space-y-3">
      {topics.map((topic) => (
        <Card 
          key={topic.id} 
          className={`hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20 ${
            topic.isPinned ? 'border-primary/50 animate-pulse-glow' : ''
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {topic.isPinned && (
                    <Badge className="bg-primary/20 text-primary border-primary/50">
                      <Icon name="Pin" className="w-3 h-3 mr-1" />
                      Закреплено
                    </Badge>
                  )}
                  {topic.isHot && (
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                      <Icon name="Flame" className="w-3 h-3 mr-1" />
                      Горячее
                    </Badge>
                  )}
                  <Badge className={getCategoryColor(topic.category)}>
                    {topic.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg hover:text-primary transition-colors">
                  {topic.title}
                </CardTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border-2 border-primary/30">
                      <AvatarFallback className="bg-primary/20 text-xs">
                        {topic.author.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground/80">{topic.author.username}</span>
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                      Lv {topic.author.level}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1 min-w-[120px]">
                <div className="flex items-center justify-end gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="MessageSquare" className="w-4 h-4" />
                    <span>{topic.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" className="w-4 h-4" />
                    <span>{topic.views}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{topic.lastActivity}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Gamepad2" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GameForum
                </h1>
                <p className="text-xs text-muted-foreground">Игровое сообщество</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{currentUser.username}</p>
                    <p className="text-xs text-muted-foreground">Level {currentUser.level}</p>
                  </div>
                  <Avatar className="w-10 h-10 border-2 border-primary">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      {currentUser.username[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="LogIn" className="w-4 h-4 mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-primary/30">
                    <DialogHeader>
                      <DialogTitle>Вход в систему</DialogTitle>
                      <DialogDescription>
                        Войдите в свой аккаунт чтобы участвовать в форуме
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Input placeholder="Имя пользователя" />
                      </div>
                      <div>
                        <Input type="password" placeholder="Пароль" />
                      </div>
                      <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-primary to-secondary">
                        Войти
                      </Button>
                      <Button variant="outline" className="w-full">
                        Регистрация
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Навигация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === 'home' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('home')}
                >
                  <Icon name="Home" className="w-4 h-4 mr-2" />
                  Главная
                </Button>
                <Button
                  variant={activeTab === 'rules' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('rules')}
                >
                  <Icon name="BookOpen" className="w-4 h-4 mr-2" />
                  Правила
                </Button>
                <Button
                  variant={activeTab === 'discussions' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('discussions')}
                >
                  <Icon name="MessageSquare" className="w-4 h-4 mr-2" />
                  Обсуждения
                </Button>
                <Button
                  variant={activeTab === 'applications' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('applications')}
                >
                  <Icon name="FileText" className="w-4 h-4 mr-2" />
                  Анкеты
                </Button>
                <Button
                  variant={activeTab === 'reports' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('reports')}
                >
                  <Icon name="Flag" className="w-4 h-4 mr-2" />
                  Отчёты
                </Button>
              </CardContent>
            </Card>

            {currentUser && (
              <Card className="mt-6 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Уровень</span>
                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50">
                      {currentUser.level}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Сообщений</span>
                    <span className="text-sm font-medium">{currentUser.posts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Репутация</span>
                    <span className="text-sm font-medium text-primary">{currentUser.reputation}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>

          <div className="lg:col-span-3 space-y-6">
            {currentUser && (
              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Создать новую тему</CardTitle>
                      <CardDescription>Поделитесь своими мыслями с сообществом</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-secondary">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Создать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-primary/30 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Новая тема</DialogTitle>
                          <DialogDescription>
                            Создайте новую тему для обсуждения
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input placeholder="Заголовок темы" />
                          <Textarea placeholder="Содержание сообщения..." rows={8} />
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                              Опубликовать
                            </Button>
                            <Button variant="outline">
                              Предпросмотр
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
              </Card>
            )}

            <div className="animate-fade-in">
              {activeTab === 'home' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Популярные темы</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="TrendingUp" className="w-4 h-4 mr-2" />
                        Популярное
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Clock" className="w-4 h-4 mr-2" />
                        Новое
                      </Button>
                    </div>
                  </div>
                  {renderTopics(mockTopics)}
                </div>
              )}

              {activeTab === 'rules' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Правила форума</CardTitle>
                    <CardDescription>Обязательно к прочтению для всех участников</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Icon name="Shield" className="w-5 h-5 text-primary" />
                        1. Уважение к другим участникам
                      </h3>
                      <p className="text-muted-foreground">
                        Запрещены любые формы оскорблений, угроз и дискриминации.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Icon name="Ban" className="w-5 h-5 text-primary" />
                        2. Запрет на спам
                      </h3>
                      <p className="text-muted-foreground">
                        Не создавайте повторяющиеся темы и не флудите в обсуждениях.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Icon name="AlertCircle" className="w-5 h-5 text-primary" />
                        3. Контент и безопасность
                      </h3>
                      <p className="text-muted-foreground">
                        Запрещено размещение запрещенного контента и нарушение авторских прав.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'discussions' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Обсуждения</h2>
                  {renderTopics(mockTopics.filter(t => t.category === 'Обсуждения'))}
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Анкеты</h2>
                  {renderTopics(mockTopics.filter(t => t.category === 'Анкеты'))}
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Отчёты</h2>
                  {renderTopics(mockTopics.filter(t => t.category === 'Отчёты'))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 GameForum. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">О проекте</a>
              <a href="#" className="hover:text-primary transition-colors">Помощь</a>
              <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForumPage;
