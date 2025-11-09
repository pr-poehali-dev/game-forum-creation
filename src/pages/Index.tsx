import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  username: string;
  avatar: string;
  posts: number;
  reputation: number;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subsections: Subsection[];
}

interface Subsection {
  id: string;
  name: string;
  description: string;
  topics: number;
  posts: number;
  lastPost?: {
    title: string;
    author: string;
    date: string;
  };
}

interface Topic {
  id: string;
  title: string;
  author: User;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned?: boolean;
}

const ForumPage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { toast } = useToast();

  const mockUser: User = {
    id: '1',
    username: 'ProGamer2024',
    avatar: '',
    posts: 1337,
    reputation: 9999
  };

  const forumCategories: ForumCategory[] = [
    {
      id: '1',
      name: 'Информация',
      description: 'Важная информация о проекте',
      icon: 'Info',
      subsections: [
        {
          id: '1-1',
          name: 'Правила проекта',
          description: 'Основные правила сервера и форума',
          topics: 5,
          posts: 128,
          lastPost: {
            title: 'Обновление правил 2024',
            author: 'Admin',
            date: 'Сегодня, 14:32'
          }
        },
        {
          id: '1-2',
          name: 'Новости',
          description: 'Актуальные новости проекта',
          topics: 234,
          posts: 5678,
          lastPost: {
            title: 'Патч 3.5 - Новые возможности',
            author: 'ModerTeam',
            date: 'Сегодня, 12:15'
          }
        }
      ]
    },
    {
      id: '2',
      name: 'Игровой процесс',
      description: 'Обсуждение игрового процесса',
      icon: 'Gamepad2',
      subsections: [
        {
          id: '2-1',
          name: 'Общие обсуждения',
          description: 'Обсуждение всего что связано с игрой',
          topics: 1234,
          posts: 45678,
          lastPost: {
            title: 'Лучшие способы заработка',
            author: 'PlayerPro',
            date: 'Сегодня, 15:42'
          }
        },
        {
          id: '2-2',
          name: 'Гайды и советы',
          description: 'Полезные руководства для игроков',
          topics: 456,
          posts: 12345,
          lastPost: {
            title: 'Гайд для новичков 2024',
            author: 'Helper123',
            date: 'Вчера, 18:20'
          }
        }
      ]
    },
    {
      id: '3',
      name: 'Персонал',
      description: 'Взаимодействие с администрацией',
      icon: 'Shield',
      subsections: [
        {
          id: '3-1',
          name: 'Анкеты',
          description: 'Подать заявку в команду проекта',
          topics: 89,
          posts: 567,
          lastPost: {
            title: 'Заявка на Helper',
            author: 'NewPlayer',
            date: 'Сегодня, 16:05'
          }
        },
        {
          id: '3-2',
          name: 'Жалобы',
          description: 'Пожаловаться на нарушителя',
          topics: 234,
          posts: 1890,
          lastPost: {
            title: 'Жалоба на игрока',
            author: 'User456',
            date: 'Сегодня, 13:28'
          }
        }
      ]
    },
    {
      id: '4',
      name: 'Отчёты',
      description: 'Отчётность фракций и организаций',
      icon: 'FileText',
      subsections: [
        {
          id: '4-1',
          name: 'Отчёты лидеров',
          description: 'Отчёты лидеров государственных организаций',
          topics: 156,
          posts: 890,
          lastPost: {
            title: 'Отчёт LSPD за неделю',
            author: 'ChiefLSPD',
            date: 'Сегодня, 11:00'
          }
        }
      ]
    }
  ];

  const mockTopics: Topic[] = [
    {
      id: 't1',
      title: 'Обновление правил форума - обязательно к прочтению',
      author: { id: '2', username: 'Admin', avatar: '', posts: 5000, reputation: 50000 },
      replies: 45,
      views: 2340,
      lastActivity: '5 мин назад',
      isPinned: true
    },
    {
      id: 't2',
      title: 'Как правильно оформить жалобу на игрока',
      author: { id: '3', username: 'ModerTeam', avatar: '', posts: 3200, reputation: 25000 },
      replies: 23,
      views: 890,
      lastActivity: '1 час назад'
    },
    {
      id: 't3',
      title: 'Обсуждение последнего обновления',
      author: { id: '4', username: 'PlayerOne', avatar: '', posts: 1200, reputation: 8000 },
      replies: 156,
      views: 5678,
      lastActivity: '30 мин назад'
    }
  ];

  const handleLogin = () => {
    setCurrentUser(mockUser);
    setIsLoginOpen(false);
    toast({
      title: 'Вход выполнен',
      description: `Добро пожаловать, ${mockUser.username}!`
    });
  };

  const handleSubsectionClick = (subsectionId: string) => {
    setSelectedSubsection(subsectionId);
    setSelectedTopic(null);
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleBackToForum = () => {
    setSelectedSubsection(null);
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const stats = {
    totalTopics: 2345,
    totalPosts: 67890,
    totalUsers: 12456,
    newestMember: 'NewPlayer2024'
  };

  const currentSubsection = forumCategories
    .flatMap(cat => cat.subsections)
    .find(sub => sub.id === selectedSubsection);

  const currentTopic = mockTopics.find(t => t.id === selectedTopic);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Icon name="Flame" className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-orange-500">Arizona GG RP</h1>
                <p className="text-xs text-muted-foreground">Форум сервера</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{currentUser.username}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.posts} сообщений</p>
                  </div>
                  <Avatar className="w-10 h-10 border-2 border-orange-500">
                    <AvatarFallback className="bg-orange-500/20 text-orange-500">
                      {currentUser.username[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Icon name="LogIn" className="w-4 h-4 mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Вход на форум</DialogTitle>
                      <DialogDescription>
                        Войдите используя данные игрового аккаунта
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Имя пользователя" />
                      <Input type="password" placeholder="Пароль" />
                      <Button onClick={handleLogin} className="w-full bg-orange-500 hover:bg-orange-600">
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

          <nav className="flex gap-1 pb-2 text-sm border-t border-border/50 pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:text-orange-500"
              onClick={handleBackToForum}
            >
              <Icon name="Home" className="w-4 h-4 mr-1" />
              Главная
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-orange-500">
              <Icon name="Users" className="w-4 h-4 mr-1" />
              Участники
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-orange-500">
              <Icon name="Search" className="w-4 h-4 mr-1" />
              Поиск
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-orange-500">
              <Icon name="HelpCircle" className="w-4 h-4 mr-1" />
              Помощь
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {!selectedSubsection && !selectedTopic && (
              <>
                {forumCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b border-border py-3">
                      <div className="flex items-center gap-2">
                        <Icon name={category.icon as any} className="w-5 h-5 text-orange-500" />
                        <div>
                          <CardTitle className="text-base">{category.name}</CardTitle>
                          <CardDescription className="text-xs">{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {category.subsections.map((subsection, idx) => (
                        <div
                          key={subsection.id}
                          onClick={() => handleSubsectionClick(subsection.id)}
                          className={`p-4 hover:bg-muted/20 cursor-pointer transition-colors ${
                            idx !== category.subsections.length - 1 ? 'border-b border-border' : ''
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                              <Icon name="MessageSquare" className="w-5 h-5 text-orange-500" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm hover:text-orange-500 transition-colors">
                                {subsection.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {subsection.description}
                              </p>
                            </div>

                            <div className="hidden md:flex items-center gap-6 text-xs text-muted-foreground flex-shrink-0">
                              <div className="text-center">
                                <div className="font-semibold text-foreground">{subsection.topics}</div>
                                <div>Темы</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-foreground">{subsection.posts}</div>
                                <div>Сообщения</div>
                              </div>
                            </div>

                            {subsection.lastPost && (
                              <div className="hidden lg:block w-48 text-xs flex-shrink-0">
                                <div className="font-medium text-foreground truncate hover:text-orange-500 cursor-pointer">
                                  {subsection.lastPost.title}
                                </div>
                                <div className="text-muted-foreground mt-1">
                                  от <span className="text-orange-500">{subsection.lastPost.author}</span>
                                </div>
                                <div className="text-muted-foreground">{subsection.lastPost.date}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            {selectedSubsection && !selectedTopic && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToForum}
                    className="hover:text-orange-500"
                  >
                    <Icon name="Home" className="w-4 h-4 mr-1" />
                    Форум
                  </Button>
                  <Icon name="ChevronRight" className="w-4 h-4" />
                  <span className="text-foreground font-medium">{currentSubsection?.name}</span>
                </div>

                <Card>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{currentSubsection?.name}</CardTitle>
                        <CardDescription>{currentSubsection?.description}</CardDescription>
                      </div>
                      {currentUser && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              <Icon name="Plus" className="w-4 h-4 mr-2" />
                              Создать тему
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Создать новую тему</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input placeholder="Заголовок темы" />
                              <Textarea placeholder="Содержание..." rows={10} />
                              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                Опубликовать
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {mockTopics.map((topic, idx) => (
                      <div
                        key={topic.id}
                        onClick={() => handleTopicClick(topic.id)}
                        className={`p-4 hover:bg-muted/20 cursor-pointer transition-colors ${
                          idx !== mockTopics.length - 1 ? 'border-b border-border' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-orange-500/20 text-orange-500">
                                {topic.author.username[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {topic.isPinned && (
                                <Badge variant="outline" className="bg-orange-500/20 text-orange-500 border-orange-500/50">
                                  <Icon name="Pin" className="w-3 h-3 mr-1" />
                                  Закреплено
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold hover:text-orange-500 transition-colors">
                              {topic.title}
                            </h3>
                            <div className="text-xs text-muted-foreground mt-1">
                              Автор: <span className="text-orange-500">{topic.author.username}</span>
                            </div>
                          </div>

                          <div className="hidden md:flex items-center gap-6 text-xs text-muted-foreground flex-shrink-0">
                            <div className="text-center">
                              <div className="font-semibold text-foreground">{topic.replies}</div>
                              <div>Ответы</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-foreground">{topic.views}</div>
                              <div>Просмотры</div>
                            </div>
                          </div>

                          <div className="hidden lg:block text-xs text-muted-foreground flex-shrink-0">
                            {topic.lastActivity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTopic && currentTopic && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToForum}
                    className="hover:text-orange-500"
                  >
                    <Icon name="Home" className="w-4 h-4 mr-1" />
                    Форум
                  </Button>
                  <Icon name="ChevronRight" className="w-4 h-4" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToTopics}
                    className="hover:text-orange-500"
                  >
                    {currentSubsection?.name}
                  </Button>
                  <Icon name="ChevronRight" className="w-4 h-4" />
                  <span className="text-foreground font-medium truncate">{currentTopic.title}</span>
                </div>

                <Card>
                  <CardHeader className="border-b">
                    <CardTitle>{currentTopic.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-orange-500/20 text-orange-500 text-xs">
                            {currentTopic.author.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>{currentTopic.author.username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" className="w-4 h-4" />
                        {currentTopic.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MessageSquare" className="w-4 h-4" />
                        {currentTopic.replies}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-orange-500/20 text-orange-500">
                            {currentTopic.author.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-semibold">{currentTopic.author.username}</div>
                              <div className="text-xs text-muted-foreground">
                                {currentTopic.author.posts} сообщений • Репутация: {currentTopic.author.reputation}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">{currentTopic.lastActivity}</div>
                          </div>
                          <div className="text-sm">
                            <p>Это пример сообщения в теме форума. Здесь автор описывает тему обсуждения и задаёт вопросы сообществу.</p>
                          </div>
                        </div>
                      </div>

                      {currentUser && (
                        <Card className="border-orange-500/30">
                          <CardHeader>
                            <CardTitle className="text-base">Ответить на тему</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <Textarea placeholder="Введите ваш ответ..." rows={6} />
                              <Button className="bg-orange-500 hover:bg-orange-600">
                                <Icon name="Send" className="w-4 h-4 mr-2" />
                                Отправить ответ
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Статистика форума</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Тем:</span>
                  <span className="font-semibold">{stats.totalTopics.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сообщений:</span>
                  <span className="font-semibold">{stats.totalPosts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Пользователей:</span>
                  <span className="font-semibold">{stats.totalUsers.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">Новый участник:</div>
                  <div className="font-medium text-orange-500 text-sm">{stats.newestMember}</div>
                </div>
              </CardContent>
            </Card>

            {currentUser && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="sm">
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Создать тему
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Создать новую тему</DialogTitle>
                        <DialogDescription>
                          Выберите раздел и заполните форму
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Заголовок темы" />
                        <Textarea placeholder="Содержание сообщения..." rows={10} />
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          Опубликовать
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full" size="sm">
                    <Icon name="Inbox" className="w-4 h-4 mr-2" />
                    Личные сообщения
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Icon name="Bell" className="w-4 h-4 mr-2" />
                    Уведомления
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon name="Users" className="w-4 h-4 text-green-500" />
                  Кто онлайн
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Всего:</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Участников:</span>
                    <span className="font-semibold text-green-500">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Гостей:</span>
                    <span className="font-semibold">67</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t border-border mt-12 bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>© 2024 Arizona GG RP. Все права защищены.</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-orange-500 transition-colors">Правила</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Помощь</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForumPage;
