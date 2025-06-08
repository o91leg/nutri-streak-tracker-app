
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Share, Users, Flame } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  // Mock data - will be replaced with Telegram WebApp API
  const user = {
    username: 'Oleg',
    photo_url: '', // Will be populated from Telegram WebApp
  };

  const profileStats = {
    loginStreak: 15,
    invitedFriends: 3,
  };

  const handleCopyInviteLink = () => {
    // Will be replaced with actual Telegram invite link generation
    const inviteLink = 'https://t.me/your_bot_name?start=invite_code';
    navigator.clipboard.writeText(inviteLink);
    toast.success('Ссылка скопирована!');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground pt-4">
          Профиль
        </h1>

        {/* User Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.photo_url} alt={user.username} />
                <AvatarFallback className="text-2xl">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">@{user.username}</h2>
                <p className="text-sm text-muted-foreground">Пользователь Telegram</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Block */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Подписка
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Дней подряд в приложении:</span>
              </div>
              <span className="font-bold text-foreground">{profileStats.loginStreak}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Приглашено друзей:</span>
              </div>
              <span className="font-bold text-foreground">{profileStats.invitedFriends}</span>
            </div>

            <Button 
              onClick={handleCopyInviteLink}
              className="w-full mt-4"
              variant="outline"
            >
              <Share className="w-4 h-4 mr-2" />
              Копировать ссылку-приглашение
            </Button>
          </CardContent>
        </Card>

        {/* Additional Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Достижения</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Всего записей:</span>
              <span className="font-medium text-foreground">127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Средний рейтинг дня:</span>
              <span className="font-medium text-foreground">8.2/10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Лучший месяц:</span>
              <span className="font-medium text-foreground">Ноябрь 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
