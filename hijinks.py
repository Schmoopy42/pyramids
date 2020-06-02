#!/usr/bin/python3
from random import randint
import numpy as np

winner = ''

# setup board
board = [[ [], [], [] ],
    [ [3,2,1], [3,2,1], [3,2,1] ],
    [ [], [], [] ]]

def show_board(board, player=1):
    print()             # print empty line to make it more readable
    if player == 1:
        for x in reversed(board):
            for i in reversed(x):
                print(i, end='')
            print()
    else:
        for x in board:
            print(x)

def dice_roll():
    return randint(1,3)

def move_pyramids(from_x, from_y, quantity, direction):
    ''' Some important rules
        - You can't move a pyramid on top of a smaller pyramid
        - You can't move a pyramid FROM your opponent's homerow 
    '''
    _possible_directions = ['up','down','left','right']

    _fromspace = board[from_x][from_y]
    to_x = from_x
    to_y = from_y

    if direction not in _possible_directions:
        print("Not a valid direction.")
    else:
        if direction == "up":
            to_x -= 1
        elif direction == "down":
            to_x += 1
        elif direction == "left":
            to_y -= 1
        elif direction == "right":
            to_y += 1

    # check to make sure no values are negative
    if ( 0 <= to_x <= 2 ) and ( 0 <= to_y <= 2 ):
        _tospace = board[to_x][to_y]
        _pyramid = _fromspace.pop()
        _tospace.append(_pyramid)
    else:
        print("Can't move that way.")

def parse_command(command):
    pass

move_pyramids(1, 0, 1, "down")
show_board(board)
show_board(board, 2)

while winner == '':
    num_of_moves = dice_roll()
    print("You rolled a " + str(num_of_moves) + " so you can move " + str(num_of_moves) + " times.")
    show_board(board)

    # spot_x = int(input("spot x"))
    # spot_y = int(input("spot y"))
    # quantity = int(input("quantity"))
    # direction = input("direction")
    # move_pyramids(spot_x, spot_y, quantity, direction)

    command = input("> ")
    parse_command(command)






