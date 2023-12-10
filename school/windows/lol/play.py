import pygame
import sys

# ゲームの初期設定
WIDTH, HEIGHT = 640, 480
BALL_RADIUS = 10
PADDLE_WIDTH, PADDLE_HEIGHT = 15, 80
FPS = 60
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BALL_SPEED = 5
PADDLE_SPEED = 10

# スコア
score_player = 0
score_enemy = 0

# Pygameの初期化
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

# フォントの設定
font = pygame.font.Font(None, 36)

# ボールとパドルの初期位置
ball = pygame.Rect(WIDTH // 2, HEIGHT // 2, BALL_RADIUS * 2, BALL_RADIUS * 2)
paddle_player = pygame.Rect(WIDTH - PADDLE_WIDTH - 20, HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
paddle_enemy = pygame.Rect(20, HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)

# ボールの速度（x方向とy方向）
ball_dx = ball_dy = BALL_SPEED

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # プレイヤーのパドルの移動（上下）
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        paddle_player.move_ip(0, -PADDLE_SPEED)
    if keys[pygame.K_DOWN]:
        paddle_player.move_ip(0, PADDLE_SPEED)

    # プレイヤーのパドルが画面外に出ないように制限
    if paddle_player.top <= 0:
        paddle_player.top = 0
    if paddle_player.bottom >= HEIGHT:
        paddle_player.bottom = HEIGHT

    # 敵のパドルがボールを追いかけるように移動（滑らかな動き）
    if ball.centery > paddle_enemy.centery:
        paddle_enemy.move_ip(0, min(PADDLE_SPEED, ball.centery - paddle_enemy.centery))
    elif ball.centery < paddle_enemy.centery:
        paddle_enemy.move_ip(0, -min(PADDLE_SPEED, paddle_enemy.centery - ball.centery))

    # 敵のパドルが画面外に出ないように制限
    if paddle_enemy.top <= 0:
        paddle_enemy.top = 0
    if paddle_enemy.bottom >= HEIGHT:
        paddle_enemy.bottom = HEIGHT

    # ボールの移動
    ball.move_ip(ball_dx, ball_dy)

    # ボールが壁に当たったら反射
    if ball.left < 0 or ball.right > WIDTH:
        ball_dx *= -1

    # ボールが上下の壁に当たったら反射
    if ball.top < 0 or ball.bottom > HEIGHT:
        ball_dy *= -1

    # ボールがプレイヤーのパドルに当たったら反射、スコア加算
    if ball.colliderect(paddle_player):
        ball_dx *= -1

    # ボールが敵のパドルに当たったら反射、スコア加算
    if ball.colliderect(paddle_enemy):
        ball_dx *= -1

    # ボールがプレイヤー側の壁に当たったらライフ減少、ゲームオーバーチェック
    if ball.right > WIDTH:
        score_enemy += 1

        if score_enemy == 3:
            lose_text = font.render("Game Over", True, WHITE)
            screen.blit(lose_text, (WIDTH // 2 - lose_text.get_width() // 2, HEIGHT // 2 - lose_text.get_height() // 2))
            pygame.display.flip()
            pygame.time.wait(3000)
            pygame.quit()
            sys.exit()

        ball.center = (WIDTH // 2, HEIGHT // 2)

    # ボールが敵側の壁に当たったらスコア加算、ゲームオーバーチェック
    if ball.left < 0:
        score_player += 1

        if score_player == 3:
            win_text = font.render("Game Win", True, WHITE)
            screen.blit(win_text, (WIDTH // 2 - win_text.get_width() // 2, HEIGHT // 2 - win_text.get_height() // 2))
            pygame.display.flip()
            pygame.time.wait(3000)
            pygame.quit()
            sys.exit()

        ball.center = (WIDTH // 2, HEIGHT // 2)

    # 描画
    screen.fill(BLACK)
    
    # スコアを描画
    score_text = font.render("Player: " + str(score_player) + " Enemy: " + str(score_enemy), True, WHITE)
    screen.blit(score_text, (WIDTH // 2 - score_text.get_width() // 2, 20))

    pygame.draw.rect(screen, WHITE, paddle_player)
    pygame.draw.rect(screen, WHITE, paddle_enemy)
    pygame.draw.ellipse(screen, WHITE, ball)
    pygame.draw.aaline(screen, WHITE, (WIDTH // 2, 0), (WIDTH // 2, HEIGHT))

    pygame.display.flip()
    clock.tick(FPS)
