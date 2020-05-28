#!/usr/bin/python3

class pyramid:
    def __init__(self, color, size):
        self.color = color
        self.size = size

    def showStats(self):
        print(self.color, self.size)

    def incrementSize(self):
        self.size += 1

    def decrementSize(self):
        self.size -= 1

class player:
    def __init__(self, name):
        self.name = name

class board:
    def __init__(self, stuff_in_play):
        self.stuff_in_play = stuff_in_play

'''
 Game start
'''
board = board(pyramid('red', 3))

print(board.stuff_in_play)
