import discord
from discord.ext import commands
from decouple import config
import asyncio

intents = discord.Intents.all()
bot = commands.Bot(command_prefix='.', intents=intents)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')

# Add variables for rate limiting and tracking success
rate_limit_delay = 5  # Initial delay between messages
success_in_guild = {}  # Dictionary to track success in each guild

@bot.command()
async def all(ctx, *, command_to_execute):
    for guild in bot.guilds:
        if guild.id in success_in_guild and success_in_guild[guild.id]:
            continue  # Skip the guild if a message was sent successfully before

        for text_channel in guild.text_channels:
            try:
                await text_channel.send(command_to_execute)
                await asyncio.sleep(rate_limit_delay) 
                success_in_guild[guild.id] = True  
                break  
            except discord.Forbidden as e:
                print(f'Error executing command in {guild.name}: {e}: Missing Permissions')
               
                continue
            except discord.HTTPException as e:
                if e.status == 429:  
                    await asyncio.sleep(5) 
                else:
                    print(f'Error executing command in {guild.name}: {e}')
            except Exception as e:
                print(f'Error executing command in {guild.name}: {e}')

bot_token = config('TOKEN')
bot.run(bot_token)
